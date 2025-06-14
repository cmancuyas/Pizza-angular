using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PIZZA.APP.Model.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }  // PK

        [Required]
        public int OrderId { get; set; }

        [ForeignKey("OrderId")]
        public Order? Order { get; set; }

        [Required]
        public int PizzaId { get; set; }  // FK to Pizza.Id

        [ForeignKey("PizzaId")]
        public Pizza? Pizza { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [NotMapped]
        public decimal Total => Quantity * UnitPrice;
    }


}
