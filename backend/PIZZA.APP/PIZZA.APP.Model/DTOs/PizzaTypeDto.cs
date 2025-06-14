namespace PIZZA.APP.Model.DTOs
{
    public class PizzaTypeDto
    {
        public int Id { get; set; }                        // Internal DB Id
        public string PizzaTypeCode { get; set; } = "";    // External business code
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public string Ingredients { get; set; } = "";
    }

}