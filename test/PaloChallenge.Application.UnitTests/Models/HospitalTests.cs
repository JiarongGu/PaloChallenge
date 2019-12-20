using PaloChallenge.Application.Models;
using System.Collections.Generic;
using Xunit;

namespace PaloChallenge.Application.UnitTest.Models
{
    public class HospitalTests
    {
        [Fact]
        public void ShouldCualculateWaitingTimeCorrectly()
        {
            var hospital = new Hospital
            {
                WaitingList = new List<Waiting> {
                    new Waiting {  AverageProcessTime = 10, PatientCount = 5 },
                    new Waiting {  AverageProcessTime = 40, PatientCount = 4 }
                }
            };

            var expected = 10 * 5 + 40 * 4;
            Assert.Equal(expected, hospital.WaitingTotal);
        }

        [Fact]
        public void ShouldReturnZeroWhenNoWaiting()
        {
            var hospital = new Hospital();
            Assert.Equal(0, hospital.WaitingTotal);
        }
    }
}
