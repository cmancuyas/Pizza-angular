namespace PIZZA.APP.Model.DTOs
{
    public class PizzaCreateDto
    {
        public string PizzaCode { get; set; } = "";
        public string PizzaTypeCode { get; set; } = "";
        public string Size { get; set; } = "";
        public decimal Price { get; set; }
    }

}
