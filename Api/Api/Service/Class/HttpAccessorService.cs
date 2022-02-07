using Api.Service.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Api.Service.Class
{
    public class HttpAccessorService : IHttpAccessorService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public HttpAccessorService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetRocketId()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var headers = _httpContextAccessor.HttpContext.Request.Headers.ContainsKey("RocketId");
                if (headers)
                {
                    return _httpContextAccessor.HttpContext.Request.Headers["RocketId"];
                }
                else
                {
                    var identity = _httpContextAccessor.HttpContext.Request.Query["RocketId"];
                    if (identity != "")
                    {
                        return identity;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            else
                return null;
        }
    }
}
