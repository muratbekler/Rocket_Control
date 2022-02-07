using Api.Model.View;
using System.Threading.Tasks;

namespace Api.Hubs.Interfaces
{
    public interface IRocketControlHub
    {
        Task Command(string rocketId, RocketVM model);
    }
}
