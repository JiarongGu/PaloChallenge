using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using PaloChallenge.Application.Extensions;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Models.External;
using PaloChallenge.Application.Models.Options;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace PaloChallenge.Application.DataSources
{
    /// <summary>
    /// data of hospitals from api
    /// </summary>
    public class HospitalData : IExternalData<Hospital>
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly IOptions<ExternalOptions> _options;

        public HospitalData(IHttpClientFactory httpClientFactory, IMemoryCache cache, IOptions<ExternalOptions> options)
        {
            _httpClientFactory = httpClientFactory;
            _options = options;
            _cache = cache;
        }

        public async Task<IEnumerable<Hospital>> ListAsync()
        {
            return await _cache.GetOrCreateAsync(nameof(HospitalData), async (key) =>
            {
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.GetAsync<ExternalResponse<Hospital>>(_options.Value.HospitalUrl);
                return response.Embedded[_options.Value.HospitalEmbaded];
            });
        }
    }
}
