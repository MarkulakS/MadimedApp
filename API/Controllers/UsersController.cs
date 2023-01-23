
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        // [Authorize(Roles = "Personel, Admin")]
        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery]UserParams userParams){

            // var pesel = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
            var currentUser = await _userRepository.GetUserByPeselAsync(User.GetPesel());
            userParams.CurrentPesel = currentUser.Pesel;

            var users = await _userRepository.GetMembersAsync(userParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));

            return Ok(users);
        }

        [HttpGet("{pesel}")]
        public async Task<ActionResult<MemberDto>> GetUser(string pesel){
            return await _userRepository.GetMemberAsync(pesel);
        }

        [HttpPut("{pesel}")]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto) {
            var pesel = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByPeselAsync(pesel);

            // zastępuje:
            // user.City = memberUpdateDto.City;    ... itd.
            _mapper.Map(memberUpdateDto, user);
            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }


        // Delete users by id
        [HttpDelete("delete/{pesel}")]
        public async Task<ActionResult> DeleteUser() {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByIdAsync(Int32.Parse(id));
            // var user = await _userRepository.GetUserByIdAsync(3);

            _userRepository.DeleteUser(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to delete user");
        }
        
    }
}