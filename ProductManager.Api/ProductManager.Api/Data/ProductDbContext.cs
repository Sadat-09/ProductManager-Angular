using Microsoft.EntityFrameworkCore;
using ProductManager.Api.Models;

namespace ProductManager.Api.Data
{
    public class ProductDbContext: DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
