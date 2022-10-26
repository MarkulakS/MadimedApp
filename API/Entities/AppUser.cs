using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Pesel { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Town { get; set; }
        public string Street { get; set; }
        public string Code { get; set; }
        public string LastClinic { get; set; }

        // public int Id { get; set; }
        // public string UserName { get; set; }
        // public byte[] PasswordHash { get; set; }
        // public byte[] PasswordSalt { get; set; }
        // public DateTime DateOfBirth { get; set; }
        // public DateTime Created { get; set; } = DateTime.Now;
        // public string Gender { get; set; }
        // public string City { get; set; }
        // public string Country { get; set; }

        // public int GetAge() {
        //     return DateOfBirth.CalculateAge();
        // }
    }
}