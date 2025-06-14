using PIZZA.APP.DataAccess;
using PIZZA.APP.Interfaces;
using PIZZA.APP.Model.Models;

namespace PIZZA.APP.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IGenericRepository<PizzaType> PizzaTypes { get; }
        public IGenericRepository<Pizza> Pizzas { get; }
        public IGenericRepository<Order> Orders { get; }
        public IGenericRepository<OrderDetail> OrderDetails { get; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            PizzaTypes = new GenericRepository<PizzaType>(_context);
            Pizzas = new GenericRepository<Pizza>(_context);
            Orders = new GenericRepository<Order>(_context);
            OrderDetails = new GenericRepository<OrderDetail>(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
