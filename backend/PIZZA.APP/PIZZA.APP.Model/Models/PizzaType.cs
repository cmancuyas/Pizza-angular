using System.ComponentModel.DataAnnotations;

namespace PIZZA.APP.Model.Models
{
    public class PizzaType
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;
        [MaxLength(500)]
        public string Ingredients { get; set; } = string.Empty;
        public ICollection<Pizza> Pizzas { get; set; } = new List<Pizza>();
    }
}
