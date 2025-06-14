using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.DTOs
{
    public class PizzaDto
    {
        public int Id { get; set; }
        public int PizzaTypeId { get; set; }
        public string Size { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
