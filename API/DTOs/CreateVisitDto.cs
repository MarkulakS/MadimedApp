using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateVisitDto
    {
        public string DoctorPesel { get; set; }
        public string DoctorFirstName { get; set;}
        public string DoctorLastName { get; set;}
        public DateTime CreateDate { get; set; }
        public DateTime CreateTime { get; set; }
        public string Form { get; set; }
        public string Comments { get; set; }
    }
}