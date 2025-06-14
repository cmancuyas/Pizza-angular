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
    public class PizzaTypesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PizzaTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPizzaTypes()
        {
            var pizzaTypes = await _unitOfWork.PizzaTypes.GetAllAsync();
            var pizzaTypeDtos = _mapper.Map<IEnumerable<PizzaTypeDto>>(pizzaTypes);
            return Ok(pizzaTypeDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizzaType(int id)
        {
            var pizzaType = await _unitOfWork.PizzaTypes.GetByIdAsync(id);
            if (pizzaType == null)
                return NotFound();
            var dto = _mapper.Map<PizzaTypeDto>(pizzaType);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePizzaType([FromBody] PizzaTypeDto pizzaTypeDto)
        {
            var pizzaType = _mapper.Map<PizzaType>(pizzaTypeDto);
            await _unitOfWork.PizzaTypes.AddAsync(pizzaType);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetPizzaType), new { id = pizzaType.Id }, _mapper.Map<PizzaTypeDto>(pizzaType));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizzaType(int id, [FromBody] PizzaTypeDto pizzaTypeDto)
        {
            var existing = await _unitOfWork.PizzaTypes.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _mapper.Map(pizzaTypeDto, existing); // Map updates onto existing entity
            _unitOfWork.PizzaTypes.Update(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizzaType(int id)
        {
            var existing = await _unitOfWork.PizzaTypes.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _unitOfWork.PizzaTypes.Remove(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
