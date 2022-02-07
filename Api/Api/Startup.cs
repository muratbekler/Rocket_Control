using Api.HttpInterceptor.Classes;
using Api.Hubs.Class;
using Api.Service.Class;
using Api.Service.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class Startup
    {
        private string _corsPolicyName;
        private string[] _corsOrigins;
        private string[] _corsMethods;
        private string[] _corsHeaders;
        public static string RocketApiServiceUrl { get; private set; }
        public static string RocketApiServiceUserName { get; private set; }
        public static string RocketApiServicePassword { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _corsPolicyName = Configuration.GetValue<string>("CORS:PolicyName");
            _corsOrigins = Configuration.GetSection("CORS:Origins").Get<string[]>();
            _corsMethods = Configuration.GetSection("CORS:Methods").Get<string[]>();
            _corsHeaders = Configuration.GetSection("CORS:Headers").Get<string[]>();
            RocketApiServiceUrl = Configuration.GetValue<string>("RocketApiService:Url");
            RocketApiServiceUserName = Configuration.GetValue<string>("RocketApiService:UserName");
            RocketApiServicePassword = Configuration.GetValue<string>("RocketApiService:Password");
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDependencyInjection(services);
            services.AddCors(o => o.AddPolicy(_corsPolicyName, builder =>
            {
                builder.WithOrigins(_corsOrigins)
                       .WithMethods(_corsMethods)
                       .WithHeaders(_corsHeaders)
                       .AllowCredentials()
                       .WithExposedHeaders("X-Pagination");
            }));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });
            services.AddSignalR(hubOptions =>
            {
                hubOptions.MaximumReceiveMessageSize = null;
                hubOptions.EnableDetailedErrors = true;
                //hubOptions.KeepAliveInterval = TimeSpan.FromMinutes(60);
                hubOptions.ClientTimeoutInterval = TimeSpan.FromMinutes(60);
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddControllers(options => options.EnableEndpointRouting = false);
            services.AddHttpContextAccessor();

        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            //Costum Middleware
            app.UseHttpMiddleware();
            app.UseCors(_corsPolicyName);
            app.UseRouting();
            app.UseAuthorization();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<RocketControlHub>("/hub-rocket", options =>
                {
                    options.Transports = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
                });
                endpoints.MapControllers();
            });
            
        }
        public void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IHttpAccessorService, HttpAccessorService>();
            services.AddScoped(provider => new Lazy<IHttpAccessorService>(provider.GetService<IHttpAccessorService>));

            services.AddScoped<IRocketTelemetryService, RocketTelemetryService>();
            services.AddScoped(provider => new Lazy<IRocketTelemetryService>(provider.GetService<IRocketTelemetryService>));
        }
    }
}
