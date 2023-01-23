using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(d => d.Address, o => o.MapFrom(s => s.Address))
                .ForMember(d => d.Pesel, o => o.MapFrom(s => s.UserName));
            CreateMap<AddressDto, MemberDto>();
            
            CreateMap<MemberUpdateDto, AppUser>()
                .ForMember(d => d.Address, o => o.MapFrom(s => s.Address));

            CreateMap<UserAddress, AddressDto>();
            CreateMap<AddressDto, UserAddress>();
            CreateMap<RegisterDto, AppUser>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Pesel));
            CreateMap<Visit, VisitDto>();
        }
    }
}