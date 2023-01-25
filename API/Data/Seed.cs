using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            // var users = JsonSerializer.Deserialize<List<AppUser>>(userData, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            // var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole{ Name = "Member"},
                new AppRole{ Name = "Personel"},
                new AppRole{ Name = "Admin"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Passw1!");
                await userManager.AddToRoleAsync(user, "Member" );
            }    

            var admin = new AppUser
            {
                UserName = "00000000000",
                Pesel = "00000000000",
                FirstName = "admin",
                LastName = "admin"
            };

            await userManager.CreateAsync(admin, "Passw1!");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}