using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class VisitParams : PaginationParams
    {
        public string Pesel { get; set; }
        public string Container { get; set; } = "NotDone";
    }
}