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
    public class PizzasController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PizzasController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPizzas()
        {
            var pizzas = await _unitOfWork.Pizzas.GetAllAsync();
            var pizzaDtos = _mapper.Map<IEnumerable<PizzaDto>>(pizzas);
            return Ok(pizzaDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPizza(int id)
        {
            var pizza = await _unitOfWork.Pizzas.GetByIdAsync(id);
            if (pizza == null)
                return NotFound();
            var dto = _mapper.Map<PizzaDto>(pizza);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePizza([FromBody] PizzaDto pizzaDto)
        {
            var pizza = _mapper.Map<Pizza>(pizzaDto);
            await _unitOfWork.Pizzas.AddAsync(pizza);
            await _unitOfWork.CompleteAsync();
            return CreatedAtAction(nameof(GetPizza), new { id = pizza.Id }, _mapper.Map<PizzaDto>(pizza));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePizza(int id, [FromBody] PizzaDto pizzaDto)
        {
            var existing = await _unitOfWork.Pizzas.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _mapper.Map(pizzaDto, existing);
            _unitOfWork.Pizzas.Update(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var existing = await _unitOfWork.Pizzas.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            _unitOfWork.Pizzas.Remove(existing);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
