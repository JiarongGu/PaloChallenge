using System;
using System.Collections.Generic;
using System.Text;

namespace PaloChallenge.Application.Models.External
{
    public class Page
    {
        public int Size { get; set; }
        public int TotalElements { get; set; }
        public int TotalPages { get; set; }
        public int Number { get; set; }
    }
}
