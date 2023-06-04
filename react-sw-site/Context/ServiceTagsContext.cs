using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;

namespace react_sw_site.Context
{
    public class ServiceTagsContext : DbContext
    {
        public DbSet<ServiceTags> ServiceTags { get; set; }

        public ServiceTagsContext(DbContextOptions<ServiceTagsContext> context) : base(context)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServiceTags>()
                .HasKey(e => e.ID);

            modelBuilder.Entity<ServiceTags>()
                .Property(e => e.Service_Name)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}