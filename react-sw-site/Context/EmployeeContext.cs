using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;

namespace react_sw_site.Context
{
    public class EmployeeContext : DbContext
    {
        public DbSet<Employees> Employees { get; set; }

        public EmployeeContext(DbContextOptions<EmployeeContext> context) : base(context)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employees>()
                .HasKey(e => e.ID);

            modelBuilder.Entity<Employees>()
                .Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Employees>()
                .Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}