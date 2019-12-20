using System.Collections.Generic;
using System.Linq;

namespace PaloChallenge.Application.Models
{
    public class Hospital
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<Waiting> WaitingList { get; set; }

        public Location Location { get; set; }

        public int WaitingTotal => WaitingList?.Sum(w => w.AverageProcessTime * w.PatientCount) ?? 0;
    }
}
