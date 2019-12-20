using PaloChallenge.Application.DataSources;
using PaloChallenge.Application.Models;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaloChallenge.Application.Repositories
{
    public interface IHospitalRepository
    {
        Task<IEnumerable<Hospital>> ListAsync();

        Task<Hospital> GetAsync(int id);

        Task<Hospital> SaveAsync(Hospital hospital);
    }

    public class HospitalRepository: IHospitalRepository
    {
        private readonly IExternalData<Hospital> _data;
        private ConcurrentDictionary<int, Hospital> _hospitals;
        private readonly object _lock = new object();

        public HospitalRepository(IExternalData<Hospital> data)
        {
            _data = data;
        }

        public async Task<IEnumerable<Hospital>> ListAsync()
        {
            var hospitals = await GetHospitalsAsync();
            return hospitals.Select(x => x.Value);
        }

        public async Task<Hospital> GetAsync(int id)
        {
            var hospitals = await GetHospitalsAsync();

            if (hospitals.ContainsKey(id))
                return hospitals[id];

            return null;
        }

        public async Task<Hospital> SaveAsync(Hospital hospital)
        {
            var hospitals = await GetHospitalsAsync();
            hospitals[hospital.Id] = hospital;
            return hospitals[hospital.Id];
        }

        private async Task<ConcurrentDictionary<int, Hospital>> GetHospitalsAsync()
        {
            if (_hospitals == null)
            {
                var data = await _data.ListAsync();
                lock (_lock)
                {
                    _hospitals = new ConcurrentDictionary<int, Hospital>(data.ToDictionary(x => x.Id, x => x));
                }
            }
            return _hospitals;
        }
    }
}
