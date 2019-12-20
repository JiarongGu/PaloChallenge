using Microsoft.AspNetCore.Mvc;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaloChallenge.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IllnessController : Controller
    {
        private IIllnessService _illnessService;
        public IllnessController(IIllnessService illnessService)
        {
            _illnessService = illnessService;
        }

        [HttpGet]
        public async Task<IEnumerable<Illness>> List()
        {
            return await _illnessService.ListAsync();
        }
    }
}