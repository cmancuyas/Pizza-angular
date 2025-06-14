using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PIZZA.APP.Interfaces;
using PIZZA.APP.Model.DTOs;
using PIZZA.APP.Model.Models;

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

    // GET: api/Pizzas
    [HttpGet]
    public async Task<IActionResult> GetPizzas(int pageNumber = 1, int pageSize = 10)
    {
        var (pizzas, totalCount) = await _unitOfWork.Pizzas.GetAllAsync(
            null,
            includeProperties: "PizzaType",
            null,
            false,
            pageSize,
            pageNumber);

        var pizzaDtos = _mapper.Map<IEnumerable<PizzaDto>>(pizzas);
        Response.Headers.Append("X-Total-Count", totalCount.ToString());
        return Ok(pizzaDtos);
    }

    // GET: api/Pizzas/{pizzaCode}
    [HttpGet("{pizzaCode}")]
    public async Task<IActionResult> GetPizza(string pizzaCode)
    {
        var pizza = await _unitOfWork.Pizzas.GetAsync(x => x.PizzaCode == pizzaCode, includeProperties: "PizzaType");
        if (pizza == null)
            return NotFound();

        var dto = _mapper.Map<PizzaDto>(pizza);
        return Ok(dto);
    }

    // POST: api/Pizzas
    [HttpPost]
    public async Task<IActionResult> CreatePizza([FromBody] PizzaCreateDto pizzaCreateDto)
    {
        if (pizzaCreateDto == null)
            return BadRequest("Invalid pizza data.");

        // Validate PizzaTypeCode
        var pizzaType = await _unitOfWork.PizzaTypes.GetAsync(x => x.PizzaTypeCode == pizzaCreateDto.PizzaTypeCode);
        if (pizzaType == null)
            return BadRequest($"Pizza type '{pizzaCreateDto.PizzaTypeCode}' does not exist.");

        var pizza = new Pizza
        {
            PizzaCode = pizzaCreateDto.PizzaCode,
            PizzaTypeId = pizzaType.Id,
            Size = pizzaCreateDto.Size,
            Price = pizzaCreateDto.Price
        };

        await _unitOfWork.Pizzas.AddAsync(pizza);
        await _unitOfWork.CompleteAsync();

        var created = await _unitOfWork.Pizzas.GetAsync(x => x.PizzaCode == pizza.PizzaCode, includeProperties: "PizzaType");
        var pizzaDto = _mapper.Map<PizzaDto>(created);

        return CreatedAtAction(nameof(GetPizza), new { pizzaCode = pizza.PizzaCode }, pizzaDto);
    }

    // PUT: api/Pizzas/{pizzaCode}
    [HttpPut("{pizzaCode}")]
    public async Task<IActionResult> UpdatePizza(string pizzaCode, [FromBody] PizzaEditDto pizzaEditDto)
    {
        if (pizzaCode != pizzaEditDto.PizzaCode)
            return BadRequest("PizzaCode in URL and DTO do not match.");

        var existing = await _unitOfWork.Pizzas.GetAsync(x => x.PizzaCode == pizzaCode);
        if (existing == null)
            return NotFound();

        var pizzaType = await _unitOfWork.PizzaTypes.GetAsync(x => x.PizzaTypeCode == pizzaEditDto.PizzaTypeCode);
        if (pizzaType == null)
            return BadRequest($"Pizza type '{pizzaEditDto.PizzaTypeCode}' does not exist.");

        // Update fields
        existing.PizzaTypeId = pizzaType.Id;
        existing.Size = pizzaEditDto.Size;
        existing.Price = pizzaEditDto.Price;

        _unitOfWork.Pizzas.Update(existing);
        await _unitOfWork.CompleteAsync();

        var updated = await _unitOfWork.Pizzas.GetAsync(x => x.PizzaCode == pizzaCode, includeProperties: "PizzaType");
        var pizzaDto = _mapper.Map<PizzaDto>(updated);

        return Ok(pizzaDto);
    }

    // DELETE: api/Pizzas/{pizzaCode}
    [HttpDelete("{pizzaCode}")]
    public async Task<IActionResult> DeletePizza(string pizzaCode)
    {
        var existing = await _unitOfWork.Pizzas.GetAsync(x => x.PizzaCode == pizzaCode);
        if (existing == null)
            return NotFound();

        await _unitOfWork.Pizzas.RemoveAsync(existing);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }
}
