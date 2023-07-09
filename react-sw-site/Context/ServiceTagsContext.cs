using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using react_sw_site.Models;

namespace react_sw_site.Context
{
    public class ServiceTagsContext : DbContext
    {
        public DbSet<ServiceTags> ServiceTags { get; set; }

        public ServiceTagsContext(DbContextOptions<ServiceTagsContext> options) : base(options)
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
