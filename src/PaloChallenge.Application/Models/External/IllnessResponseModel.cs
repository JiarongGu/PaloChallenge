using Newtonsoft.Json;
using System.Collections.Generic;

namespace PaloChallenge.Application.Models.External
{
    public class IllnessResponseModel
    {
        public Illness Illness { get; set; }

        [JsonProperty("_links")]
        public IDictionary<string, Link> Links { get; set; }
    }
}
