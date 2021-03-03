using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarks.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Bookmark> GetBookmarks(int userId)
        {
            using (var ctx = new BookmarkContext(_connectionString))
            {
                return ctx.Bookmarks.Where(b => b.UserId == userId).ToList();
            }
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using (var ctx = new BookmarkContext(_connectionString))
            {
                ctx.Bookmarks.Add(bookmark);
                ctx.SaveChanges();
            }
        }

        public void UpdateBookmark(string newTitle, int bookmarkId)
        {
            using (var ctx = new BookmarkContext(_connectionString))
            {
                ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {newTitle} WHERE Id = {bookmarkId}");
                ctx.SaveChanges();
            }
        }

        public void DeleteBookmark(int bookmarkId)
        {
            using (var ctx = new BookmarkContext(_connectionString))
            {
                ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {bookmarkId}");
                ctx.SaveChanges();
            }
        }

        public List<TopBookmark> GetTopFive()
        {
            var query = "SELECT TOP 5 Url, Count(*) AS 'Count' FROM Bookmarks GROUP BY Url ORDER BY COUNT(*) DESC";

            using (var ctx = new BookmarkContext(_connectionString))
            {
                return ctx.TopBookmarks.FromSqlRaw(query).ToList();
            }
        }
    }
}
