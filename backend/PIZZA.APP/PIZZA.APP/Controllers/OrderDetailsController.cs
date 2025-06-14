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
        public async Task<IActionResult> GetOrderDetails()
        {
            var details = await _unitOfWork.OrderDetails.GetAllAsync();
            var detailDtos = _mapper.Map<IEnumerable<OrderDetailDto>>(details);
            return Ok(detailDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetail(int id)
        {
            var detail = await _unitOfWork.OrderDetails.GetByIdAsync(id);
            if (detail == null)
                return NotFound();
            var dto = _mapper.Map<OrderDetailDto>(detail);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderDetail([FromBody] OrderDetailDto detailDto)
        {
            var detail = _mapper.Map<OrderDetail>(detailDto);
            await _unitOfWork.OrderDetails.AddAsync(detail);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetOrderDetail), new { id = detail.Id }, _mapper.Map<OrderDetailDto>(detail));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderDetail(int id, [FromBody] OrderDetailDto detailDto)
        {
            var existing = await _unitOfWork.OrderDetails.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _mapper.Map(detailDto, existing);
            _unitOfWork.OrderDetails.Update(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var existing = await _unitOfWork.OrderDetails.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _unitOfWork.OrderDetails.Remove(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
