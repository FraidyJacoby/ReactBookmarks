using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;
using ReactBookmarks.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bm)
        {
            var user = GetCurrentUser();
            bm.UserId = user.Id;
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(bm);
        }

        [HttpGet]
        [Route("getbookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var user = GetCurrentUser();
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarks(user.Id);
        }

        [HttpPost]
        [Route("updatebookmark")]
        public void UpdateBookmark(UpdateBookmarkViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(vm.NewTitle, vm.BookmarkId);
        }

        private User GetCurrentUser()
        {
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(DeleteBookmarkViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(vm.BookmarkId);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("gettopfive")]
        public List<TopBookmark> GetTopFive()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopFive();
        }
    }
}
