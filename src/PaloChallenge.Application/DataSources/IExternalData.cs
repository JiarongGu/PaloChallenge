using System.Collections.Generic;
using System.Threading.Tasks;

namespace PaloChallenge.Application.DataSources
{
    public interface IExternalData<T>
    {
        Task<IEnumerable<T>> ListAsync();
    }
}
