using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PIZZA.APP.Interfaces;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;

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
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _unitOfWork.Orders.GetAllAsync();
            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
            return Ok(orderDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _unitOfWork.Orders.GetByIdAsync(id);
            if (order == null)
                return NotFound();
            var dto = _mapper.Map<OrderDto>(order);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, _mapper.Map<OrderDto>(order));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDto orderDto)
        {
            var existing = await _unitOfWork.Orders.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _mapper.Map(orderDto, existing);
            _unitOfWork.Orders.Update(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var existing = await _unitOfWork.Orders.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _unitOfWork.Orders.Remove(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}