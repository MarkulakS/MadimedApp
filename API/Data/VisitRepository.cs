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
    public class VisitRepository : IVisitRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VisitRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddVisit(Visit visit)
        {
            _context.Visits.Add(visit);
        }

        public void DeleteVisit(Visit visit)
        {
            _context.Visits.Remove(visit);
        }

        public async Task<Visit> GetVisit(int id)
        {
            return await _context.Visits.FindAsync(id);
        }

        public async Task<IEnumerable<DateTime>> GetVisitsFromDate(DateTime date)
        {
            var visits = await _context.Visits
                .Where(x => x.Date == date)
                .Select(x => x.Time)
                .ToListAsync();

            return visits;
        }

        public async Task<PagedList<VisitDto>> GetVisitsForUser(VisitParams visitParams)
        {
            var query = _context.Visits
                .OrderBy(x => x.Date)
                .ThenBy(x => x.Time)
                .AsQueryable();

            query = visitParams.Container switch
            {
                "Inbox" => query.Where(u => u.DoctorPesel == visitParams.Pesel),
                "Outbox" => query.Where(u => u.SenderPesel == visitParams.Pesel),
                _ => query.Where(u => u.SenderPesel == visitParams.Pesel && u.DateRead == null)
            };

            var visits = query.ProjectTo<VisitDto>(_mapper.ConfigurationProvider);

            return await PagedList<VisitDto>.CreateAsync(visits, visitParams.PageNumber, visitParams.PageSize);
        }

        public async Task<IEnumerable<VisitDto>> GetVisitThread(string currentUserPesel, string doctorPesel)
        {
            var visits = await _context.Visits
                .Include(u => u.Sender)
                .Where(
                    m => m.DoctorPesel == currentUserPesel &&
                    m.SenderPesel == doctorPesel ||
                    m.DoctorPesel == doctorPesel && 
                    m.SenderPesel == currentUserPesel
                )
                .OrderBy(m => m.Date)
                .ToListAsync();

            return _mapper.Map<IEnumerable<VisitDto>>(visits);
        }

        public async Task<IEnumerable<VisitDto>> MakeVisitDone(string currentUserPesel, string doctorPesel)
        {
            var visits = await _context.Visits
                .Include(u => u.Sender)
                .Where(
                    m => m.DoctorPesel == currentUserPesel &&
                    m.SenderPesel == doctorPesel ||
                    m.DoctorPesel == doctorPesel && 
                    m.SenderPesel == currentUserPesel
                )
                .OrderBy(m => m.Date)
                .ToListAsync();

        //nadanie daty odczytania wizyty gdy sie obejrzy wszystkie

            var notDoneVisits = visits.Where(m => m.DateRead == null
                && m.DoctorPesel == currentUserPesel).ToList();

            if(notDoneVisits.Any())
            {
                foreach(var visit in notDoneVisits)
                {
                    visit.DateRead = DateTime.UtcNow;
                }
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<VisitDto>>(visits);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}