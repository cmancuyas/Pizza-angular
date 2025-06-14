using AutoMapper;
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

        // GET: api/PizzaTypes?pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<IActionResult> GetPizzaTypes(int pageNumber = 1, int pageSize = 10)
        {
            var (pizzaTypes, totalCount) = await _unitOfWork.PizzaTypes.GetAllAsync(
                null,          // No filter
                "Pizzas",      // Include navigation
                null,          // No ordering
                false,         // No tracking
                pageSize,
                pageNumber);

            var dtoList = _mapper.Map<IEnumerable<PizzaTypeDto>>(pizzaTypes);
            Response.Headers.Append("X-Total-Count", totalCount.ToString());
            return Ok(dtoList);
        }

        // GET: api/PizzaTypes/{code}
        [HttpGet("{pizzaTypeCode}")]
        public async Task<IActionResult> GetPizzaType(string pizzaTypeCode)
        {
            var pizzaType = await _unitOfWork.PizzaTypes.GetAsync(
                x => x.PizzaTypeCode == pizzaTypeCode,
                "Pizzas");

            if (pizzaType == null)
                return NotFound();

            var dto = _mapper.Map<PizzaTypeDto>(pizzaType);
            return Ok(dto);
        }

        // POST: api/PizzaTypes
        [HttpPost]
        public async Task<IActionResult> CreatePizzaType([FromBody] PizzaTypeDto pizzaTypeDto)
        {
            var exists = await _unitOfWork.PizzaTypes.GetAsync(x => x.PizzaTypeCode == pizzaTypeDto.PizzaTypeCode);
            if (exists != null)
                return Conflict($"Pizza type code '{pizzaTypeDto.PizzaTypeCode}' already exists.");

            var pizzaType = _mapper.Map<PizzaType>(pizzaTypeDto);
            await _unitOfWork.PizzaTypes.AddAsync(pizzaType);
            await _unitOfWork.CompleteAsync();

            var createdDto = _mapper.Map<PizzaTypeDto>(pizzaType);
            return CreatedAtAction(nameof(GetPizzaType), new { pizzaTypeCode = pizzaType.PizzaTypeCode }, createdDto);
        }

        // PUT: api/PizzaTypes/{code}
        [HttpPut("{pizzaTypeCode}")]
        public async Task<IActionResult> UpdatePizzaType(string pizzaTypeCode, [FromBody] PizzaTypeDto pizzaTypeDto)
        {
            var existing = await _unitOfWork.PizzaTypes.GetAsync(x => x.PizzaTypeCode == pizzaTypeCode);
            if (existing == null)
                return NotFound();

            _mapper.Map(pizzaTypeDto, existing);
            _unitOfWork.PizzaTypes.Update(existing);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        // DELETE: api/PizzaTypes/{code}
        [HttpDelete("{pizzaTypeCode}")]
        public async Task<IActionResult> DeletePizzaType(string pizzaTypeCode)
        {
            var existing = await _unitOfWork.PizzaTypes.GetAsync(x => x.PizzaTypeCode == pizzaTypeCode);
            if (existing == null)
                return NotFound();

            await _unitOfWork.PizzaTypes.RemoveAsync(existing);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
