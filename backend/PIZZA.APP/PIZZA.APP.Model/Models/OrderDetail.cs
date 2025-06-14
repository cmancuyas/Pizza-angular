using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int PizzaId { get; set; }
        public int Quantity { get; set; }
        public Order Order { get; set; } = new Order();
        public Pizza Pizza { get; set; } = new Pizza();
    }
}
