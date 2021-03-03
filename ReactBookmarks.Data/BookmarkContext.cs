using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactBookmarks.Data
{
    public class BookmarkContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarkContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TopBookmark>().HasNoKey();
        }

        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TopBookmark> TopBookmarks { get; set; }
    }
}
