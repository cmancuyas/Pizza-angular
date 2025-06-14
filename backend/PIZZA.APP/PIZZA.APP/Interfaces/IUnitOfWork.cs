using PIZZA.APP.Model.Models;

namespace PIZZA.APP.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<PizzaType> PizzaTypes { get; }
        IGenericRepository<Pizza> Pizzas { get; }
        IGenericRepository<Order> Orders { get; }
        IGenericRepository<OrderDetail> OrderDetails { get; }
        Task<int> CompleteAsync(); // SaveChanges
    }
}
