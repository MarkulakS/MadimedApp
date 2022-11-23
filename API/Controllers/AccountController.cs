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
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService tokenService;
        public readonly IMapper _mapper;

        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await UserExists(registerDto.Pesel)) return BadRequest("Pesel is taken!");

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            // Pesel = registerDto.Pesel.ToLower(),
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Pesel = user.Pesel,
                Token = tokenService.CreateToken(user),
                FirstName = user.FirstName
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Pesel == loginDto.Pesel);

            if (user == null) return Unauthorized("Invalid pesel");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Pesel = user.Pesel,
                Token = tokenService.CreateToken(user),
                FirstName = user.FirstName
            };
        }

        private async Task<bool> UserExists(string pesel)
        {
            return await _context.Users.AnyAsync(x => x.Pesel == pesel);
            // return await _context.Users.AnyAsync(x => x.Pesel == pesel.ToLower());

        }
    }
}