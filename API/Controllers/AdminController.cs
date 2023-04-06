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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;

        public AdminController(UserManager<AppUser> userManager) {
            _userManager = userManager;
            
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles() 
        {
            var users = await _userManager.Users
                .OrderBy(u => u.Pesel)
                .Select(u => new {
                    u.Id,
                    Pesel = u.Pesel,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("users-with-roles/{pesel}")]
        public async Task<ActionResult> GetUsersWithRolesByPesel(string pesel) 
        {
            var users = await _userManager.Users
                .Where(u => u.Pesel == pesel)
                .OrderBy(u => u.Pesel)
                .Select(u => new {
                    u.Id,
                    Pesel = u.Pesel,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("edit-roles/{pesel}")]
        public async Task<ActionResult> EditRoles(string pesel, [FromQuery]string roles)
        {
            if(string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role");
            
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(pesel);

            if(user == null) return NotFound();

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if(!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if(!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("personel")]
        public async Task<ActionResult> GetPersonelUsers() 
        {
            var personel = await _userManager.Users
                .Where(u => u.UserRoles.Any(r => r.Role.Name == "Personel"))
                .OrderBy(u => u.Pesel)
                .Select(u => new {
                    u.Id,
                    Pesel = u.Pesel,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(personel);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("members")]
        public async Task<ActionResult> GetMembersUsers() 
        {
            var members = await _userManager.Users
                .Where(u => u.UserRoles.Any(r => r.Role.Name == "Member"))
                .OrderBy(u => u.Pesel)
                .Select(u => new {
                    u.Id,
                    Pesel = u.Pesel,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(members);
        }


    }
}