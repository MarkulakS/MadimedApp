using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper){
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(a => a.Address)
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByPeselAsync(string pesel)
        {
            return await _context.Users
                .Include(a => a.Address)
                .SingleOrDefaultAsync(x => x.Pesel == pesel);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteUser(AppUser user)
        {
            // _context.Entry(user).State = EntityState.Deleted;
        }

        public void UpdateAddress(UserAddress address)
        {
            _context.Update(address);
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users
                .Include(a => a.Address)
                .AsQueryable();
            
            query = userParams.OrderBy switch {
                "pesel" => query.OrderByDescending( u => u.Pesel),
                _ => query.OrderBy( u => u.Id)
            };
            
            //pokazuje wszystkich oprocz aktualnie zalogowanego 
            query = query.Where(u => u.Pesel != userParams.CurrentPesel);

            return await PagedList<MemberDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
                userParams.PageNumber, 
                userParams.PageSize);
        }

        public async Task<MemberDto> GetMemberAsync(string pesel)
        {
            return await _context.Users
                .Include(a => a.Address)
                .Where(x => x.Pesel == pesel)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

    }
}