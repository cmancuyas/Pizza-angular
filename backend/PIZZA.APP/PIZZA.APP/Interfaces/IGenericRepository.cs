using System.Linq.Expressions;

namespace PIZZA.APP.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        void Add(T entity);
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);

        Task<T?> GetAsync(Expression<Func<T, bool>> filter,
                         string? includeProperties = null,
                         bool tracked = false);

        Task<(IEnumerable<T> Items, int TotalCount)> GetAllAsync(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            bool tracked = false,
            int pageSize = 0,
            int pageNumber = 1);

        Task UpdateRangeAsync(IEnumerable<T> entities);

        Task RemoveAsync(T entity);
        Task RemoveRangeAsync(IEnumerable<T> entities);
        Task SaveChangesAsync();

        Task<IQueryable<T>> AsQueryableAsync(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            bool tracked = false);

        IQueryable<T> AsQueryable(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            bool tracked = false);

        Task<int> CountAsync();
        int Count();
        Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);
        void Update(T entity);
    }
}
