using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIZZA.APP.Model.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public int PizzaTypeId { get; set; }
        [MaxLength(10)]
        public string Size { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public PizzaType PizzaType { get; set; } = new PizzaType();
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
