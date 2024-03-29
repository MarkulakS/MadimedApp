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

        [HttpDelete("delete-visit/{id}")]
        public async Task<ActionResult> DeleteVisit(int id) 
        {
            var visit = await _visitRepository.GetVisit(id); 

            if(visit == null) return NotFound();

            if(visit.DateRead != null) return BadRequest("Can't remove visit that have been made!");

            _visitRepository.DeleteVisit(visit);

            if(await _visitRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to remove visit");
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
        

        [HttpGet("thread/{pesel}")]
        public async Task<ActionResult<IEnumerable<VisitDto>>> GetVisitThread(string pesel)
        {
            var currentUserPesel = User.GetPesel();

            return Ok(await _visitRepository.GetVisitThread(currentUserPesel, pesel));
        }

        [HttpGet("date/{pesel}/{date}")]
        public async Task<ActionResult> GetVisitsFromDate(DateTime date, string pesel) 
        {
            var visits = await _visitRepository.GetVisitsFromDate(date, pesel);

            if(visits == null) return NotFound("Theres no visits in that day");

            return Ok(visits);
        }

        [HttpPost("make-read/{visitId}")]
        public async Task<ActionResult> MakeVisitRead(int visitId)
        {
            var visit = await _visitRepository.GetVisit(visitId);
            var doctorPesel = User.GetPesel();
            if(visit.SenderPesel == doctorPesel) return BadRequest();

            var visits = await _visitRepository.GetVisitThread(visit.SenderPesel, doctorPesel);

            var notDoneVisits = visits.Where(m => m.DateRead == null && m.DoctorPesel == doctorPesel).ToList();
                        
            if(notDoneVisits.Any())
            {
                foreach(var ndVisit in notDoneVisits)
                {
                    if(ndVisit.Id == visit.Id)
                    {
                        visit.DateRead = DateTime.UtcNow;
                        _visitRepository.UpdateVisit(visit);
                    }
                }
            }

            if(await _visitRepository.SaveAllAsync()) return Ok();
            return BadRequest("Something went wrong saving changes");
        }
    }
}