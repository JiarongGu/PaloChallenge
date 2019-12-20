using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace PaloChallenge.Application.Models.External
{
    public class ExternalResponse<T>
    {
        [JsonProperty("_embedded")]
        public IDictionary<string, IEnumerable<T>> Embedded { get; set; }

        [JsonProperty("_links")]
        public IDictionary<string, Link> Links { get; set; }

        public Page Page { get; set; }
    }
}
