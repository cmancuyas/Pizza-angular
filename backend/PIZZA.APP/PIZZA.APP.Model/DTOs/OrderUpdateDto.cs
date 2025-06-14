using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.DTOs
{
    public class OrderDetailUpdateDto
    {
        public string PizzaCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }

    public class OrderUpdateDto
    {
        public string Date { get; set; } = string.Empty;  // Format: "yyyy-MM-dd"
        public string Time { get; set; } = string.Empty;  // Format: "HH:mm"
        public List<OrderDetailUpdateDto> OrderDetails { get; set; } = new();
    }
}
