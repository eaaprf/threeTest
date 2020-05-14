using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.Models
{
    public enum Cities
    {
        None, London, Paris, Chicago
    }
    public enum QualificationLevels
    {
        None, Basic, Advanced
    }
    [Table("AspNetUsers")]
    public class AppUser : IdentityUser
    {
        public Cities City { get; set; }
        public QualificationLevels Qualifications { get; set; }
  
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public string CreditCard { get; set; }
        //public List<Invoice> Invoices { get; set; }
    }
}
