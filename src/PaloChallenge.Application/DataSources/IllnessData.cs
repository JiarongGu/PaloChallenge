using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using PaloChallenge.Application.Extensions;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Models.External;
using PaloChallenge.Application.Models.Options;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace PaloChallenge.Application.DataSources
{
    /// <summary>
    /// data of illnesses from api
    /// </summary>
    public class IllnessData : IExternalData<Illness>
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly IOptions<ExternalOptions> _options;

        public IllnessData(IHttpClientFactory httpClientFactory, IMemoryCache cache, IOptions<ExternalOptions> options)
        {
            _httpClientFactory = httpClientFactory;
            _options = options;
            _cache = cache;
        }

        public async Task<IEnumerable<Illness>> ListAsync()
        {
            return await _cache.GetOrCreateAsync(nameof(IllnessData), async (key) =>
            {
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.GetAsync<ExternalResponse<IllnessResponseModel>>(_options.Value.IllnessUrl);
                return response.Embedded[_options.Value.IllnessEmbaded].Select(x => x.Illness);
            });
        }
    }
}
