using Api.Model.CustomException;
using Api.Model.Interceptor;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Api.HttpInterceptor.Classes
{
    public class HttpMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.HasValue && 
                (context.Request.Path.Value.Contains("swagger") || context.Request.Path.Value.Contains("/hub")))
            {
                await _next.Invoke(context);
                return;
            }
            Stream originalBody = null;
            using (MemoryStream modifiedBody = new MemoryStream())
            {
                using (StreamReader streamReader = new StreamReader(modifiedBody))
                {
                    try
                    {
                        context.Response.OnStarting((state) =>
                        {
                            context.Response.ContentType = "application/json";

                            return Task.CompletedTask;
                        }, null);

                        originalBody = context.Response.Body;
                        context.Response.Body = modifiedBody;

                        await _next.Invoke(context);

                        modifiedBody.Seek(0, SeekOrigin.Begin);

                        string originalContent = streamReader.ReadToEnd();
                        context.Response.Body = originalBody;

                        //data view
                        //string newContent;
                        //newContent = JsonConvert.SerializeObject(new ResponseDatum
                        //{
                        //    Datum = JsonConvert.DeserializeObject(originalContent),
                        //    IsSuccessful = context.Response.StatusCode != 406
                        //});
                        if (context.Response.StatusCode != 204)
                        {
                            context.Response.ContentLength = Encoding.UTF8.GetBytes(originalContent).Length;
                            await context.Response.WriteAsync(originalContent);
                        }

                    }
                    catch (FriendlyAreaException friendlyAreaException)
                    {
                        if (!(originalBody is null) && !(modifiedBody is null))
                        {
                            modifiedBody?.Seek(0, SeekOrigin.Begin);
                            context.Response.Body = originalBody;
                        }
                        await HandleFriendlyAreaExceptionAsync(context, friendlyAreaException);
                    }
                    catch (Exception exception)
                    {
                        if (!(originalBody is null) && !(modifiedBody is null))
                        {
                            modifiedBody?.Seek(0, SeekOrigin.Begin);
                            context.Response.Body = originalBody;
                        }
                        await HandleExceptionAsync(context);
                        throw exception;
                    }
                }
            }
        }

        private async Task HandleExceptionAsync(HttpContext context)
        {
            await context.Response.WriteAsync(JsonConvert.SerializeObject(new ResponseDatum
            {
                datum = null,
                isSuccessful = false,
                message = "Sistem bir hata ile karşılaştı!"
            }));
            //context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        }

        private async Task HandleFriendlyAreaExceptionAsync(HttpContext context, FriendlyAreaException friendlyAreaException)
        {
            //context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync(JsonConvert.SerializeObject(new ResponseDatum
            {
                datum = null,
                isSuccessful = false,
                message = friendlyAreaException.Message
            }));
        }
    }

    public static class HttpMiddlewareExtensions
    {
        public static IApplicationBuilder UseHttpMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpMiddleware>();
        }
    }
}
