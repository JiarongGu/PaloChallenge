using Moq;
using PaloChallenge.Application.DataSources;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace PaloChallenge.Application.UnitTest.Repositories
{
    public class HospitalRepositoryTests
    {
        private readonly Mock<IExternalData<Hospital>> _mockData;

        public HospitalRepositoryTests()
        {
            _mockData = new Mock<IExternalData<Hospital>>();
        }

        [Fact]
        public async Task ShouldCallExternalDataWhenList()
        {
            // arrange
            var repository = CreateInstance();

            // act
            var hospitals = await repository.ListAsync();

            // asset
            _mockData.Verify(x => x.ListAsync(), Times.Once());
        }

        [Fact]
        public async Task ShouldGetCurrentHospital()
        {
            // arrange
            var repository = CreateInstance();
            var hospitals = new List<Hospital> {
                new Hospital { Id = 1, Name = "Test1" },
                new Hospital { Id = 2, Name = "Test2" }
            };
            _mockData.Setup(x => x.ListAsync()).ReturnsAsync(hospitals);

            // act
            var hospital = await repository.GetAsync(2);
            
            // asset
            Assert.Equal("Test2", hospital.Name);
        }

        [Fact]
        public async Task ShouldSaveToHositalList()
        {
            // arrange
            var repository = CreateInstance();
            var hospitals = new List<Hospital> {
                new Hospital { Id = 1, Name = "Test1" },
                new Hospital { Id = 2, Name = "Test2" }
            };
            _mockData.Setup(x => x.ListAsync()).ReturnsAsync(hospitals);

            var hospitalUpdate = new Hospital
            {
                Id = 2,
                Name = "Test3"
            };

            // act
            await repository.SaveAsync(hospitalUpdate);
            var hospital = await repository.GetAsync(2);

            // asset
            Assert.Equal("Test3", hospital.Name);
        }

        private HospitalRepository CreateInstance()
        {
            return new HospitalRepository(_mockData.Object);
        }
    }
}
