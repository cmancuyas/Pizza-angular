using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIZZA.APP.Interfaces;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;
using System.Globalization;

namespace PIZZA.APP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrdersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders(int pageNumber = 1, int pageSize = 10)
        {
            var (orders, totalCount) = await _unitOfWork.Orders.GetAllAsync(
                null,
                "OrderDetails.Pizza",
                null,
                false,
                pageSize,
                pageNumber);

            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
            Response.Headers.Append("X-Total-Count", totalCount.ToString());
            return Ok(orderDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _unitOfWork.Orders.GetAsync(x => x.Id == id, "OrderDetails.Pizza.PizzaType");
            if (order == null)
                return NotFound();

            var dto = _mapper.Map<OrderDto>(order);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto orderDto)
        {
            if (orderDto == null || orderDto.OrderDetails == null || !orderDto.OrderDetails.Any())
                return BadRequest("Order must have at least one item.");

            var order = new Order
            {
                Date = DateTime.ParseExact(orderDto.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                Time = TimeSpan.Parse(orderDto.Time),
                OrderDetails = new List<OrderDetail>()
            };

            foreach (var detailDto in orderDto.OrderDetails)
            {
                var pizza = await _unitOfWork.Pizzas.GetAsync(p => p.PizzaCode == detailDto.PizzaCode);
                if (pizza == null)
                    return BadRequest($"Pizza with code '{detailDto.PizzaCode}' not found.");

                order.OrderDetails.Add(new OrderDetail
                {
                    PizzaId = pizza.Id,
                    Quantity = detailDto.Quantity,
                    UnitPrice = pizza.Price
                });
            }

            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.CompleteAsync();

            var created = await _unitOfWork.Orders.GetAsync(x => x.Id == order.Id, "OrderDetails.Pizza");
            var createdDto = _mapper.Map<OrderDto>(created);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, createdDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, OrderUpdateDto dto)
        {
            var existingOrder = await _unitOfWork.Orders
                .GetAsync(o => o.Id == id, includeProperties: "OrderDetails");

            if (existingOrder == null)
                return NotFound();

            // Parse and update date and time
            if (!DateTime.TryParse(dto.Date, out var parsedDate))
                return BadRequest("Invalid date format.");
            if (!TimeSpan.TryParse(dto.Time, out var parsedTime))
                return BadRequest("Invalid time format.");

            existingOrder.Date = parsedDate;
            existingOrder.Time = parsedTime;

            // Remove existing order details
            await _unitOfWork.OrderDetails.RemoveRangeAsync(existingOrder.OrderDetails);

            // Add new order details
            foreach (var detailDto in dto.OrderDetails)
            {
                var pizza = await _unitOfWork.Pizzas
                    .GetAsync(p => p.PizzaCode == detailDto.PizzaCode);

                if (pizza == null) return BadRequest($"Pizza with code {detailDto.PizzaCode} not found.");

                existingOrder.OrderDetails.Add(new OrderDetail
                {
                    PizzaId = pizza.Id,
                    Quantity = detailDto.Quantity
                });
            }

            await _unitOfWork.CompleteAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var existing = await _unitOfWork.Orders.GetAsync(x => x.Id == id);
            if (existing == null)
                return NotFound();

            await _unitOfWork.Orders.RemoveAsync(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
