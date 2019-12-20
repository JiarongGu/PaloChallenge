using PaloChallenge.Application.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace PaloChallenge.Application.Repositories
{
    public interface IPatientRepository
    {
        IEnumerable<Patient> List();

        Patient Get(Guid id);

        Patient Add(Patient patient);
    }

    public class PatientRepository: IPatientRepository
    {
        private ConcurrentDictionary<Guid, Patient> _patients = new ConcurrentDictionary<Guid, Patient>();

        public IEnumerable<Patient> List()
        {
            return _patients.Select(x => x.Value);
        }

        public Patient Get(Guid id)
        {
            if (_patients.ContainsKey(id))
                return _patients[id];
            return null;
        }

        public Patient Add(Patient patient)
        {
            _patients[patient.Id] = patient;
            return patient;
        }
    }
}
