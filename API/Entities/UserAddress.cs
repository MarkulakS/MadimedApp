using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("User_Address")]
    public class UserAddress
    {
        public int Id { get; set; }
        public string Street { get; set; }        
        public string Town { get; set; }
        public string Code { get; set; }

        public AppUser AppUser { get; set; }
    }
}