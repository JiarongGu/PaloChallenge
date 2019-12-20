using PaloChallenge.Application.Models;
using PaloChallenge.Application.Repositories;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaloChallenge.Application.Services
{
    public interface IHospitalService
    {
        Task<IEnumerable<HospitalSuggestion>> ListSuggestionsAsync(int take);

        Task<Patient> AddPatientAsync(int hospitalId, int illnessId, int levelOfPain);

        Task<Hospital> GetHospitalAsync(int id);
    }

    public class HospitalService : IHospitalService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IHospitalRepository _hospitalRepository;
        private ConcurrentDictionary<int, int> _hospitalsWaitingTime;
        private readonly object _lock = new object();

        public HospitalService(IHospitalRepository hospitalRepository, IPatientRepository patientRepository)
        {
            _hospitalRepository = hospitalRepository;
            _patientRepository = patientRepository;
        }

        public async Task<IEnumerable<HospitalSuggestion>> ListSuggestionsAsync(int take)
        {
            var waitingTime = await GetHospitalsWatingTimeAsync();
            var hospitalTasks = waitingTime.ToList()
                .OrderBy(x => x.Value)
                .Take(take)
                .Select(x => x.Key)
                .Select(async x => await _hospitalRepository.GetAsync(x));

            var hospitals = await Task.WhenAll(hospitalTasks);
            return hospitals.Select(x => new HospitalSuggestion
            {
                Id = x.Id,
                Name = x.Name,
                WaitTime = waitingTime[x.Id]
            });
        }

        public async Task<Patient> AddPatientAsync(int hospitalId, int illnessId, int levelOfPain)
        {
            // add patient to hospital
            var hospital = await _hospitalRepository.GetAsync(hospitalId);

            if (hospital == null)
                return null;

            var waiting = hospital.WaitingList.FirstOrDefault(x => x.LevelOfPain == levelOfPain);

            if (waiting == null)
                return null;

            waiting.PatientCount += 1;

            await _hospitalRepository.SaveAsync(hospital);

            // calculate the waiting time
            var waitingTime = await GetHospitalsWatingTimeAsync();
            waitingTime[hospitalId] = hospital.WaitingTotal;

            // save patient
            var patient = _patientRepository.Add(new Patient
            {
                Id = Guid.NewGuid(),
                HospitalId = hospitalId,
                IllnessId = illnessId,
                LevelOfPain = levelOfPain
            });

            return patient;
        }

        public Task<Hospital> GetHospitalAsync(int id)
        {
            return _hospitalRepository.GetAsync(id);
        }

        private async Task<ConcurrentDictionary<int, int>> GetHospitalsWatingTimeAsync()
        {
            if (_hospitalsWaitingTime == null)
            {
                var hospitals = await _hospitalRepository.ListAsync();

                lock (_lock)
                {
                    _hospitalsWaitingTime = new ConcurrentDictionary<int, int>(
                        hospitals.ToDictionary(x => x.Id, x => x.WaitingTotal)
                    );
                }
            }
            return _hospitalsWaitingTime;
        }

    }
}
