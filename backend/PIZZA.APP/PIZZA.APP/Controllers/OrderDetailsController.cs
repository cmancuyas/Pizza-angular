using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PIZZA.APP.Interfaces;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;

namespace PIZZA.APP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderDetailsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderDetails(int pageNumber = 1, int pageSize = 10)
        {
            var (details, totalCount) = await _unitOfWork.OrderDetails.GetAllAsync(
                null,
                "Order,Pizza",
                null,
                false,
                pageSize,
                pageNumber
            );

            var detailDtos = _mapper.Map<IEnumerable<OrderDetailDto>>(details);
            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            return Ok(detailDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetail(int id)
        {
            var detail = await _unitOfWork.OrderDetails.GetAsync(x => x.Id == id, "Order,Pizza");
            if (detail == null)
                return NotFound();

            var dto = _mapper.Map<OrderDetailDto>(detail);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderDetail([FromBody] OrderDetailCreateDto detailDto)
        {
            var pizza = await _unitOfWork.Pizzas.GetAsync(p => p.PizzaCode == detailDto.PizzaCode);
            if (pizza == null)
                return BadRequest($"Pizza with code '{detailDto.PizzaCode}' not found.");

            var detail = new OrderDetail
            {
                PizzaId = pizza.Id,
                Quantity = detailDto.Quantity,
                UnitPrice = pizza.Price
                // You can also set OrderId if you later support creating from Order context
            };

            await _unitOfWork.OrderDetails.AddAsync(detail);
            await _unitOfWork.CompleteAsync();

            var created = await _unitOfWork.OrderDetails.GetAsync(x => x.Id == detail.Id, "Order,Pizza");
            var dto = _mapper.Map<OrderDetailDto>(created);

            return CreatedAtAction(nameof(GetOrderDetail), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderDetail(int id, [FromBody] OrderDetailDto detailDto)
        {
            if (detailDto.Id != id)
                return BadRequest("ID mismatch.");

            var existing = await _unitOfWork.OrderDetails.GetAsync(x => x.Id == id);
            if (existing == null)
                return NotFound();

            var pizza = await _unitOfWork.Pizzas.GetAsync(p => p.PizzaCode == detailDto.PizzaCode);
            if (pizza == null)
                return BadRequest($"Pizza with code '{detailDto.PizzaCode}' not found.");

            existing.PizzaId = pizza.Id;
            existing.Quantity = detailDto.Quantity;
            existing.UnitPrice = pizza.Price;

            _unitOfWork.OrderDetails.Update(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var existing = await _unitOfWork.OrderDetails.GetAsync(x => x.Id == id);
            if (existing == null)
                return NotFound();

            await _unitOfWork.OrderDetails.RemoveAsync(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
