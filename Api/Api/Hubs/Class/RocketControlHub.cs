using Api.Hub.Mapping;
using Api.Hubs.Interfaces;
using Api.Model.View;
using Api.Service.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Hubs.Class
{
    public class RocketControlHub : Hub<IRocketControlHub>
    {
        public readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        public readonly Lazy<IHttpAccessorService> _httpService;
        private readonly Lazy<IRocketTelemetryService> _telemetryService;
        public RocketControlHub(Lazy<IHttpAccessorService> httpService, Lazy<IRocketTelemetryService> rocketTelemetryService)
        {
            _httpService = httpService;
            _telemetryService = rocketTelemetryService;
        }
        public async Task SendCommand(string rocketId, string message)
        {
            if (message.Contains("Close"))
                await _telemetryService.Value.TCPDisonnect(rocketId);
            //await this.Clients.AllExcept(this.Context.ConnectionId).Command(rocketId, message);
            //await this.Clients.Caller.Command(rocketId, message);
        }
        public override async Task OnConnectedAsync()
        {
            if (!_connections.GetConnections(_httpService.Value.GetRocketId()).Contains(Context.ConnectionId))
            {
                var connections = _connections.GetConnections(_httpService.Value.GetRocketId()).ToList();
                foreach (var connectionId in connections)
                    await Groups.RemoveFromGroupAsync(connectionId, _httpService.Value.GetRocketId());

                _connections.RemoveAll(_httpService.Value.GetRocketId());

                _connections.Add(_httpService.Value.GetRocketId(), Context.ConnectionId);

                await Groups.AddToGroupAsync(_connections.GetConnections(_httpService.Value.GetRocketId()).LastOrDefault(), _httpService.Value.GetRocketId());
            }
            await base.OnConnectedAsync();

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (!_connections.GetConnections(_httpService.Value.GetRocketId()).Contains(Context.ConnectionId))
                _connections.RemoveAll(_httpService.Value.GetRocketId());

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _httpService.Value.GetRocketId());
            await base.OnDisconnectedAsync(exception);
        }
    }
}
