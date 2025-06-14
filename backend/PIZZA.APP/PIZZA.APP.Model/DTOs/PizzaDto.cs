namespace PIZZA.APP.Model.DTOs
{
    public class PizzaDto
    {
        public int Id { get; set; }                          // DB PK
        public string PizzaCode { get; set; } = "";          // Business key (e.g. "bbq_ckn_m")
        public string PizzaTypeCode { get; set; } = "";      // FK to PizzaTypeCode
        public string Size { get; set; } = "";
        public decimal Price { get; set; }

        public PizzaTypeDto? PizzaType { get; set; }         // Navigation property
    }

}