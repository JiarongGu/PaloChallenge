using System;
using System.Collections.Generic;
using System.Text;

namespace PaloChallenge.Application.Models
{
    public class Patient
    {
        public Guid Id { get; set; }

        public int HospitalId { get; set; }

        public int IllnessId { get; set; }

        public int LevelOfPain { get; set; }
    }
}
