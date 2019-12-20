using Moq;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Repositories;
using PaloChallenge.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Xunit;

namespace PaloChallenge.Application.UnitTest.Services
{
    public class HospitalServiceTests
    {
        private readonly Mock<IHospitalRepository> _mockHospitalRepository;
        private readonly Mock<IPatientRepository> _mockPatientRepository;

        public HospitalServiceTests()
        {
            _mockHospitalRepository = new Mock<IHospitalRepository>();
            _mockPatientRepository = new Mock<IPatientRepository>();
        }

        [Fact]
        public async Task ShouldGetCurrentSuggestionsInOrder()
        {
            var service = CreateInstance(10, 20);
            var hospital = (await service.ListSuggestionsAsync(1)).FirstOrDefault();

            Assert.NotNull(hospital);
            Assert.Equal(2, hospital.Id);
        }

        [Fact]
        public async Task ShouldUpdateHospitalWaitingWhenAddPatient()
        {
            var painTime = 10;
            var hospitalId = 1;
            var service = CreateInstance(painTime, painTime);
            var hospital1 = await service.GetHospitalAsync(hospitalId);
            var total1 = hospital1.WaitingTotal;

            var patient = await service.AddPatientAsync(hospitalId, 1, 0);
            var hospital2 = await service.GetHospitalAsync(hospitalId);
            var total2 = hospital2.WaitingTotal;

            Assert.Equal(total1 + painTime, total2);
            _mockPatientRepository.Verify(x => x.Add(It.IsAny<Patient>()), Times.Once());
        }

        [Fact]
        public async Task ShouldGetCorrectWaitingListAfterAddPatient() 
        {
            var service = CreateInstance(10, 20);
            var hospital1 = (await service.ListSuggestionsAsync(1)).FirstOrDefault();

            await service.AddPatientAsync(hospital1.Id, 1, 1);
            await service.AddPatientAsync(hospital1.Id, 1, 1);

            var hospital2 = (await service.ListSuggestionsAsync(1)).FirstOrDefault();

            Assert.NotEqual(hospital1.Id, hospital2.Id);
        }

        private HospitalService CreateInstance(int level1Time, int level2Time)
        {
            var hospitals = GetHospitals(level1Time, level2Time);
            _mockHospitalRepository.Setup(x => x.ListAsync()).ReturnsAsync(hospitals);
            _mockHospitalRepository.Setup(x => x.GetAsync(It.IsAny<int>()))
                .ReturnsAsync((int id) => hospitals.FirstOrDefault(x => x.Id == id));

            return new HospitalService(_mockHospitalRepository.Object, _mockPatientRepository.Object);
        }

        private IEnumerable<Hospital> GetHospitals(int level1Time, int level2Time)
        {
            return new List<Hospital>
            {
                new Hospital
                {
                    Id = 1,
                    Name = "Test Hospital 1",
                    WaitingList = new List<Waiting> {
                        new Waiting { LevelOfPain = 0, AverageProcessTime = level1Time, PatientCount = 2 },
                        new Waiting { LevelOfPain = 1, AverageProcessTime = level2Time, PatientCount = 2 }
                    }
                },
                new Hospital
                {
                    Id = 2,
                    Name = "Test Hospital 2",
                    WaitingList = new List<Waiting> {
                        new Waiting { LevelOfPain = 0, AverageProcessTime = level1Time, PatientCount = 1 },
                        new Waiting { LevelOfPain = 1, AverageProcessTime = level2Time, PatientCount = 1 }
                    }
                },
            };
        }
    }
}
