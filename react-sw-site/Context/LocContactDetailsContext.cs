using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;

namespace react_sw_site.Context
{
    public class LocContactDetailsContext : DbContext
    {
        public DbSet<LocContactDetails> LocContactDetails { get; set; }

        public LocContactDetailsContext(DbContextOptions<LocContactDetailsContext> context) : base(context)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocContactDetails>()
                .HasKey(e => e.ContactID);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.LocID)
                .IsRequired()
                .HasColumnType("int");

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactName)
                .HasMaxLength(255);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactPhoneNum)
                .HasMaxLength(255);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactEmailAdd)
                .HasMaxLength(255);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactPosition)
                .HasMaxLength(255);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactFaxNum)
                .HasMaxLength(255);

            modelBuilder.Entity<LocContactDetails>()
                .Property(e => e.ContactNotes)
                .HasColumnType("nvarchar(max)");
        }
    }
}