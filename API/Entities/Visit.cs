using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Visit
    {
        public int Id { get; set; }

        public int SenderId { get; set; }
        public string SenderPesel { get; set; }
        public AppUser Sender { get; set; }

        public int DoctorId { get; set; }
        public string DoctorPesel { get; set; }
        public string DoctorFirstName { get; set; }
        public string DoctorLastName { get; set; }
        public AppUser Doctor { get; set; }

        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public string Form { get; set; }
        public string Comments { get; set; }
        public DateTime? DateRead { get; set; }

        public bool HaveDone { get; set; }
        
        public bool SenderDeleted { get; set; }
    }
}