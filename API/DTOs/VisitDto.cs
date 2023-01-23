using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class VisitDto
    {
        public int Id { get; set; }

        public int SenderId { get; set; }
        public string SenderPesel { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }

        public int DoctorId { get; set; }
        public string DoctorPesel { get; set; }
        public string doctorFirstName { get; set; }
        public string DoctorLastName { get; set; }


        public DateTime Date { get; set; }
        public DateTime Time{ get; set; }
        public string Form { get; set; }
        public string Comments { get; set; }
        public DateTime? DateRead { get; set; }
    }
}