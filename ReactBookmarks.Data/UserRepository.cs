using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarks.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

            using(var ctx = new BookmarkContext(_connectionString))
            {
                ctx.Users.Add(user);
                ctx.SaveChanges();
            }
        }

        public User GetByEmail(string email)
        {
            using(var ctx = new BookmarkContext(_connectionString))
            {
                return ctx.Users.FirstOrDefault(u => u.Email == email);
            }
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);

            if (user == null)
            {
                return null;
            }

            bool correctPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            if (correctPassword)
            {
                return user;
            }

            return null;
        }
    }
}
