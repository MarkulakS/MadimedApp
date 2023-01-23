using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VisitsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IVisitRepository _visitRepository;
        private readonly IMapper _mapper;

        public VisitsController(IUserRepository userRepository, IVisitRepository visitRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _visitRepository = visitRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<VisitDto>> CreateVisit(CreateVisitDto createVisitDto)
        {
            var pesel = User.GetPesel();

            var sender = await _userRepository.GetUserByPeselAsync(pesel);
            var doctor = await _userRepository.GetUserByPeselAsync(createVisitDto.DoctorPesel);

            if(doctor == null) return NotFound();

            var visit = new Visit
            {
                Sender = sender,
                Doctor = doctor,
                SenderPesel = sender.Pesel,
                DoctorPesel = doctor.Pesel,
                DoctorFirstName = doctor.FirstName,
                DoctorLastName = doctor.LastName,
                Date = createVisitDto.CreateDate,
                Time = createVisitDto.CreateTime,
                Form = createVisitDto.Form,
                Comments = createVisitDto.Comments
            };

            _visitRepository.AddVisit(visit);

            if(await _visitRepository.SaveAllAsync()) return Ok(_mapper.Map<VisitDto>(visit));

            return BadRequest("Failed to make a visit");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<VisitDto>>> GetVisitsForUser([FromQuery]VisitParams visitParams)
        {
            visitParams.Pesel = User.GetPesel();

            var visits = await _visitRepository.GetVisitsForUser(visitParams);

            Response.AddPaginationHeader(new PaginationHeader(visits.CurrentPage, visits.PageSize, 
                visits.TotalCount, visits.TotalPages));

            return visits;
        }
        
//Pokazanie listy wizit dla personelu - dodać jakiś warunek dla roli
        // [HttpGet]
        // public async Task<ActionResult<PagedList<VisitDto>>> GetVisitsForPersonel([FromQuery]VisitParams visitParams)
        // {
        //     visitParams.Pesel = User.GetPesel();

        //     var visits = await _visitRepository.GetVisitsForPersonel(visitParams);

        //     Response.AddPaginationHeader(new PaginationHeader(visits.CurrentPage, visits.PageSize, 
        //         visits.TotalCount, visits.TotalPages));

        //     return visits;
        // }

        [HttpGet("thread/{pesel}")]
        public async Task<ActionResult<IEnumerable<VisitDto>>> GetVisitThread(string pesel)
        {
            var currentUserPesel = User.GetPesel();

            return Ok(await _visitRepository.GetVisitThread(currentUserPesel, pesel));
        }
    }
}