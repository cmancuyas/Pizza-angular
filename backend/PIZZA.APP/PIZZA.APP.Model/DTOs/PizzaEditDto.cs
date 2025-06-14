namespace PIZZA.APP.Model.DTOs
{
    public class PizzaEditDto
    {
        public int Id { get; set; }                          // DB Id
        public string PizzaCode { get; set; } = "";
        public string PizzaTypeCode { get; set; } = "";
        public string Size { get; set; } = "";
        public decimal Price { get; set; }
    }
}