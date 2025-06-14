using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Date { get; set; } = ""; // "yyyy-MM-dd"
        public string Time { get; set; } = ""; // "HH:mm"
        public List<OrderDetailDto> OrderDetails { get; set; } = new();
    }
}
