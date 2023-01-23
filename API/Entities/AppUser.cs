using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string Pesel { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string LastClinic { get; set; }

        public List<UserAddress> Address { get; set; } = new();

        public List<Visit> VisitSent { get; set; }
        public List<Visit> VisitDoc { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}