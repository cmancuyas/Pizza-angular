using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PIZZA.APP.Model.Models
{
    public class PizzaType
    {
        [Key]
        public int Id { get; set; }  // Primary key (int)

        [Required, MaxLength(50)]
        public string PizzaTypeCode { get; set; } = string.Empty; // e.g. "bbq_ckn"

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Ingredients { get; set; } = string.Empty;

        public ICollection<Pizza> Pizzas { get; set; } = new List<Pizza>();
    }


}