using Microsoft.EntityFrameworkCore;
using PIZZA.APP.Model.Models;

namespace PIZZA.APP.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PizzaType> PizzaTypes { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Business key indexes
            modelBuilder.Entity<Pizza>()
                .HasIndex(p => p.PizzaCode)
                .IsUnique();

            modelBuilder.Entity<PizzaType>()
                .HasIndex(pt => pt.PizzaTypeCode)
                .IsUnique();

            // Optional: enforce required + length
            modelBuilder.Entity<Pizza>()
                .Property(p => p.PizzaCode)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<PizzaType>()
                .Property(pt => pt.PizzaTypeCode)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
