using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;

namespace react_sw_site.Context
{
    public class LocCoordContext : DbContext
    {
        public DbSet<LocCoord> LocCoord { get; set; }

        public LocCoordContext(DbContextOptions<LocCoordContext> context) : base(context)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocCoord>()
                .HasKey(e => e.ID);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Latitude)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Longitude)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Loc_Name)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Loc_Address)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Phone_Num)
                .HasMaxLength(50);

            modelBuilder.Entity<LocCoord>()
                .Property(e => e.Service_Tags)
                .HasMaxLength(4000);
        }
    }
}