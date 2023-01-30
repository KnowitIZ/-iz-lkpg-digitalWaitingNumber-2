using System.Data;
using System.Security.Claims;
using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, TokenService tokenService,
            SignInManager<ApplicationUser> signInManager)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login(LoginModel loginModel)
        {
            var result = await _signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginModel.UserName);
                return await CreateUserObject(user);
            }

            return Unauthorized("Incorrect Login");

        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register(RegisterModel registerModel)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerModel.UserName))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new ApplicationUser
            {
                UserName = registerModel.UserName
            };

            var result = await _userManager.CreateAsync(user, registerModel.Password);

            if (result.Succeeded)
            {
                if (string.IsNullOrEmpty(registerModel.Role))
                {
                    registerModel.Role = "Customers";
                }
                await _userManager.AddToRoleAsync(user, registerModel.Role);
                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

            return await CreateUserObject(user);
        }

        private async Task<UserModel> CreateUserObject(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            return new UserModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
                Expiration = DateTime.Now.AddDays(1),
                Roles = roles.ToList()
            };
        }
    }
}