using Api.Model.View;
using System.Threading.Tasks;

namespace Api.Service.Interfaces
{
    public interface IRocketTelemetryService
    {
        Task TCPConnect(string rocketId, string hostAddress, int portAddress);
        Task TCPDisonnect(string rocketId);
        bool IsConnect { get; set; }
    }
}
