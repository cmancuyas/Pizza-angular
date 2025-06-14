namespace PIZZA.APP.Model.DTOs
{
    public class OrderCreateDto
    {
        public string Date { get; set; } = "";
        public string Time { get; set; } = "";
        public List<OrderDetailCreateDto> OrderDetails { get; set; } = new();
    }
}
