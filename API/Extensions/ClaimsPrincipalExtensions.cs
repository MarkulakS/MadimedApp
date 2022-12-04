using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetPesel(this ClaimsPrincipal user) {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static string GeUserId(this ClaimsPrincipal user) {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}