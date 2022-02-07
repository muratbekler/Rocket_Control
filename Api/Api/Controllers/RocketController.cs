using Api.Helper;
using Api.Model.View;
using Api.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RocketController : Controller
    {
        private readonly Lazy<IRocketTelemetryService> _rocketTelemetryService;
        public RocketController(Lazy<IRocketTelemetryService> rocketTelemetryService)
        {
            _rocketTelemetryService = rocketTelemetryService;
        }
        [Route("get-all")]
        [HttpGet]
        public async Task<CustomResult<RocketVM[]>> GetAll()
        {
            var rocketList = await RestApiService.Instance.GetAsync<RocketVM[]>("rockets");
            return StatusCode(StatusCodes.Status200OK, rocketList);
        }
        [Route("launched")]
        [HttpPut]
        public async Task<CustomResult<RocketVM>> Launch(string id)
        {
            var rocketList = await RestApiService.Instance.PutAsync<RocketVM>($"rocket/{id}/status/launched", null);
            return StatusCode(StatusCodes.Status200OK, rocketList);
        }
        [Route("launched")]
        [HttpDelete]
        public async Task<CustomResult<RocketVM>> Cancel(string id)
        {
            var rocketList = await RestApiService.Instance.DeleteAsync<RocketVM>($"rocket/{id}/status/launched");
            return StatusCode(StatusCodes.Status200OK, rocketList);
        }
        [Route("deployed")]
        [HttpPut]
        public async Task<CustomResult<RocketVM>> Deploy(string id)
        {
            var rocketList = await RestApiService.Instance.PutAsync<RocketVM>($"rocket/{id}/status/deployed", null);
            return StatusCode(StatusCodes.Status200OK, rocketList);
        }
        [Route("telemetry")]
        [HttpPost]
        public async Task<CustomResult<RocketVM>> Telemetry(RocketVM model)
        {
            _rocketTelemetryService.Value.IsConnect = true;
            await _rocketTelemetryService.Value.TCPConnect(model.id, "127.0.0.1", model.telemetry.port);
            return StatusCode(StatusCodes.Status200OK, model);
        }
    }
}
