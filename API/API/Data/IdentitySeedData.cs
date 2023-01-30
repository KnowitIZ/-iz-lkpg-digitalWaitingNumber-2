using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class IdentitySeedData
    {
        public static void CreateAccounts(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            serviceProvider = serviceProvider.CreateScope().ServiceProvider;
            UserManager<ApplicationUser> userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            RoleManager<ApplicationRole> roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            string adminUsername = configuration["Data:AdminUser:Name"] ?? "admin";
            string adminPassword = configuration["Data:AdminUser:Password"] ?? "secret";
            string adminRole = configuration["Data:AdminUser:Role"] ?? "Admins";

            CreateAccountAsync(userManager, roleManager, adminUsername, adminPassword, adminRole).Wait();
            //CreateAccountAsync(userManager, roleManager, "admin", "secret", "Admins").Wait();

            CreateAccountAsync(userManager, roleManager, "e1", "1", "Employees").Wait();
            CreateAccountAsync(userManager, roleManager, "e2", "1", "Employees").Wait();

            CreateAccountAsync(userManager, roleManager, "m1", "1", "Managers").Wait();

            CreateAccountAsync(userManager, roleManager, "c1", "1", "Customers").Wait();
            CreateAccountAsync(userManager, roleManager, "c2", "1", "Employees").Wait();
        }
        public static async Task CreateAccountAsync(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
            string userName, string password, string role, string domain = "x.x")
        {

            if (await userManager.FindByNameAsync(userName) == null)
            {
                if (await roleManager.FindByNameAsync(role) == null)
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = role });
                    //await roleManager.CreateAsync(new IdentityRole(role));
                }
                var user = new ApplicationUser
                {
                    UserName = userName,
                    Email = userName + "@" + domain
                };
                IdentityResult result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }
    }
}