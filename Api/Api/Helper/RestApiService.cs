using Api.Model.CustomException;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Api.Helper
{
    public class RestApiService
    {
        private static RestApiService instance;
        public static RestApiService Instance => instance = instance ?? new RestApiService();
        private HttpClient client;
        private string serverUrl => Startup.RocketApiServiceUrl;
        public RestApiService()
        {
            instance = this;
            System.Net.ServicePointManager.Expect100Continue = false;
            client = new HttpClient();
            client.MaxResponseContentBufferSize = 256000;
            client.Timeout = TimeSpan.FromSeconds(20);
            client.BaseAddress = new Uri(Startup.RocketApiServiceUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add(Startup.RocketApiServiceUserName, Startup.RocketApiServicePassword);
            client.DefaultRequestHeaders.TransferEncodingChunked = false;
        }
        public async Task<T> PostAsyncs<T>(string url, FormUrlEncodedContent content)
        {
            HttpResponseMessage httpResponse = client.PostAsync(new Uri($"{serverUrl}/" + url), content).Result;
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
        }
        public async Task<T> PostAsync<T>(string url, StringContent content)
        {
            HttpResponseMessage httpResponse = await client.PostAsync(new Uri($"{serverUrl}/" + url), content);
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
        }
        public async Task<T> PostAsync<T>(string url, string data)
        {
            StringContent content = new StringContent("");
            if (data != null && data.Length > 0)
            {
                content = new StringContent(data.ToString(), Encoding.UTF8, "application/json");
            }
            HttpResponseMessage httpResponse = await client.PostAsync(new Uri($"{serverUrl}/" + url), content);
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
            //return default(T);
        }
        public async Task<T> PutAsync<T>(string url, string data)
        {
            StringContent content = new StringContent("");
            if (data != null && data.Length > 0)
            {
                content = new StringContent(data.ToString(), Encoding.UTF8, "application/json");
            }
            HttpResponseMessage httpResponse = await client.PutAsync(new Uri($"{serverUrl}/" + url), content);
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
        }
        public async Task<T> DeleteAsync<T>(string url)
        {
            HttpResponseMessage httpResponse = await client.DeleteAsync(new Uri($"{serverUrl}/" + url));
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
        }
        public async Task<T> GetAsync<T>(string url)
        {
            HttpResponseMessage httpResponse = await client.GetAsync(new Uri($"{serverUrl}/" + url)).ConfigureAwait(false);
            string result = await httpResponse.Content.ReadAsStringAsync();
            if (httpResponse.IsSuccessStatusCode)
            {
                return JsonConvert.DeserializeObject<T>(result);
            }
            else if (httpResponse.StatusCode == System.Net.HttpStatusCode.BadRequest)
            {
                throw new FriendlyAreaException(result);
            }
            else
            {
                throw new FriendlyAreaException("Servisten veri alınamadı!");
            }
        }
    }
}
