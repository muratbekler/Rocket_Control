using Api.Helper;
using Api.Model.Interceptor;
using Api.Model.View;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : Controller
    {
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<WeatherVM>> Get()
        {
            var result = await RestApiService.Instance.GetAsync<WeatherVM>("weather");
            return StatusCode(StatusCodes.Status200OK, result);
        }
    }
}
