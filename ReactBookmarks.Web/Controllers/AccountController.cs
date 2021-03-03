using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarks.Data;
using ReactBookmarks.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private string _connectionString;

        public AccountController(IConfiguration confirguration)
        {
            _connectionString = confirguration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(vm, vm.Password);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);

            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim("user", vm.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }

        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
    }
}
