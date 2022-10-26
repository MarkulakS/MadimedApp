using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {

            if (await UserExists(registerDto.Pesel)) return BadRequest("Pesel is taken!");

            using var hmac = new HMACSHA512();
            
            var user = new AppUser{
                // Pesel = registerDto.Pesel.ToLower(),
                Pesel = registerDto.Pesel,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth,
                Phone = registerDto.Phone,
                Email = registerDto.Email,
                Street = registerDto.Street,
                Town = registerDto.Town,
                Code = registerDto.Code,
                LastClinic = registerDto.LastClinic
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto {
                Pesel = user.Pesel,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Pesel == loginDto.Pesel);

            if(user == null) return Unauthorized("Invalid pesel");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i< computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto {
                Pesel = user.Pesel,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string pesel) {
            return await _context.Users.AnyAsync(x => x.Pesel == pesel);
            // return await _context.Users.AnyAsync(x => x.Pesel == pesel.ToLower());

        }
    }
}