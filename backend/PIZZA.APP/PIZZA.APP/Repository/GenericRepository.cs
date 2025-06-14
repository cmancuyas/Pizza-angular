using Microsoft.EntityFrameworkCore;
using PIZZA.APP.DataAccess; 
using PIZZA.APP.Interfaces;
using System.Linq.Expressions;

namespace PIZZA.APP.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        internal DbSet<T> dbSet;

        public GenericRepository(AppDbContext context)
        {
            this._context = context;
            this.dbSet = context.Set<T>();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity); // No SaveChanges for Unit of Work pattern
        }

        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> filter,
                                      string? includeProperties = null,
                                      bool tracked = false)
        {
            IQueryable<T> query = tracked ? dbSet : dbSet.AsNoTracking();
            query = query.Where(filter);

            if (!string.IsNullOrWhiteSpace(includeProperties))
            {
                foreach (var includeProp in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<(IEnumerable<T> Items, int TotalCount)> GetAllAsync(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            bool tracked = false,
            int pageSize = 0,
            int pageNumber = 1)
        {
            IQueryable<T> query = tracked ? dbSet : dbSet.AsNoTracking();

            if (filter != null)
                query = query.Where(filter);

            if (!string.IsNullOrWhiteSpace(includeProperties))
            {
                foreach (var includeProp in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }

            var totalCount = await query.CountAsync();

            // Paging
            if (pageSize > 0 && pageNumber > 0)
            {
                if (pageSize > 100) pageSize = 100;
                query = query.Skip(pageSize * (pageNumber - 1)).Take(pageSize);
            }

            if (orderBy != null)
                query = orderBy(query);

            var items = await query.ToListAsync();

            return (items, totalCount);
        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                var entry = _context.Entry(entity);
                if (entry.State == EntityState.Detached)
                {
                    dbSet.Attach(entity);
                }
                entry.State = EntityState.Modified;
            }
            await Task.CompletedTask; // SaveChanges called at UoW level
        }

        public async Task RemoveAsync(T entity)
        {
            dbSet.Remove(entity);
            await Task.CompletedTask; // SaveChanges called at UoW level
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
            await Task.CompletedTask; // SaveChanges called at UoW level
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public Task<IQueryable<T>> AsQueryableAsync(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            bool tracked = false)
        {
            IQueryable<T> query = tracked ? dbSet : dbSet.AsNoTracking();

            if (filter != null)
                query = query.Where(filter);

            if (!string.IsNullOrWhiteSpace(includeProperties))
            {
                foreach (var includeProp in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }

            return Task.FromResult(query);
        }

        public IQueryable<T> AsQueryable(
            Expression<Func<T, bool>>? filter = null,
            string? includeProperties = null,
            bool tracked = false)
        {
            IQueryable<T> query = tracked ? dbSet : dbSet.AsNoTracking();

            if (filter != null)
                query = query.Where(filter);

            if (!string.IsNullOrWhiteSpace(includeProperties))
            {
                foreach (var includeProp in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }

            return query;
        }

        public async Task<int> CountAsync()
        {
            return await dbSet.CountAsync();
        }

        public int Count()
        {
            return dbSet.Count();
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await dbSet.AnyAsync(predicate);
        }

        public void Update(T entity)
        {
            var entry = _context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            entry.State = EntityState.Modified;
            // No SaveChanges for Unit of Work pattern
        }
    }
}
