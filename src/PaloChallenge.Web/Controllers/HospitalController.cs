using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Services;

namespace PaloChallenge.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly IHospitalService _hospitalService;

        public HospitalController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpGet]
        public async Task<IEnumerable<HospitalSuggestion>> List()
        {
            return await _hospitalService.ListSuggestionsAsync(5);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Hospital> Get(int id)
        {
            return await _hospitalService.GetHospitalAsync(id);
        }

        [HttpPost]
        [Route("{id}/patient")]
        public async Task<Patient> AddPatient(int id, Patient patient)
        {
            return await _hospitalService.AddPatientAsync(id, patient.IllnessId, patient.LevelOfPain);
        }
    }
}
