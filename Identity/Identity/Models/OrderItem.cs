﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.Models {
    public class OrderItem {
        public int Id { get; set; }
        public int WatchID { get; set; }
        public Watch Watch { get; set; }
        public int Quanity { get; set; }
        [Column(TypeName = "float")]
        public decimal TotalPrice { get; set; }
    }
}
