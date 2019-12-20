using PaloChallenge.Application.DataSources;
using PaloChallenge.Application.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaloChallenge.Application.Services
{
    public interface IIllnessService
    {
        Task<IEnumerable<Illness>> ListAsync();
    }

    public class IllnessService: IIllnessService
    {
        private readonly IExternalData<Illness> _data;

        public IllnessService(IExternalData<Illness> data)
        {
            _data = data;
        }

        public async Task<IEnumerable<Illness>> ListAsync()
        {
            return await _data.ListAsync();
        }
    }
}
