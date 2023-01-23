using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IVisitRepository
    {
        void AddVisit(Visit visit);
        void DeleteVisit(Visit visit);
        Task<Visit> GetVisit(int id);
        Task<PagedList<VisitDto>> GetVisitsForUser(VisitParams visitParams);
        Task<IEnumerable<VisitDto>> GetVisitThread(string currentUserPesel, string doctorPesel);
        Task<bool> SaveAllAsync();
    }
}