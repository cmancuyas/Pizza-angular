using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.DTOs
{
    public class OrderDetailDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string PizzaCode { get; set; } = "";
        public int Quantity { get; set; }

        public PizzaDto? Pizza { get; set; }
    }

}
