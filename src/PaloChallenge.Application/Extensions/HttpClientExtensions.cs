using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PaloChallenge.Application.Extensions
{
    public static class HttpClientExtensions
    {
        public static async Task<TResponse> GetAsync<TResponse>(this HttpClient httpClient, string requestUri)
        {
            var result = await httpClient.GetAsync(requestUri);

            if (!result.IsSuccessStatusCode)
                throw new HttpRequestException($"Request failed Content: {result.Content} ReasonPhrase: {result.ReasonPhrase} Content: {await result.Content.ReadAsStringAsync()}");

            return JsonConvert.DeserializeObject<TResponse>(await result.Content.ReadAsStringAsync());
        }

        public static async Task<TResponse> PostAsync<TRequest, TResponse>(this HttpClient httpClient, string requestUri, TRequest request)
        {
            var result = await httpClient.PostAsync(requestUri, request.FormatJsonContent());
            var responseContent = await result.Content.ReadAsStringAsync();

            if (!result.IsSuccessStatusCode)
                throw new HttpRequestException($"Request failed Content: {responseContent} ReasonPhrase: {result.ReasonPhrase}");

            return JsonConvert.DeserializeObject<TResponse>(await result.Content.ReadAsStringAsync());
        }

        private static HttpContent FormatJsonContent<T>(this T model)
        {
            return new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
        }
    }
}
