using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIZZA.APP.Model.Models
{
    public class Pizza
    {
        [Key]
        public int Id { get; set; }  // Primary key (int)

        [Required, MaxLength(50)]
        public string PizzaCode { get; set; } = string.Empty; // e.g. "bbq_ckn_m"

        [Required]
        public int PizzaTypeId { get; set; }  // FK to PizzaType.Id

        [ForeignKey("PizzaTypeId")]
        public PizzaType? PizzaType { get; set; }

        [Required, MaxLength(10)]
        public string Size { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public ICollection<OrderDetail>? OrderDetails { get; set; }
    }



}
