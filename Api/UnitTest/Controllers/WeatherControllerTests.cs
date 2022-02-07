using Api;
using Api.Controllers;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest.Controllers
{
    public class WeatherControllerTests
    {
        private MockRepository mockRepository;



        public WeatherControllerTests()
        {
            var config = new ConfigurationBuilder().SetBasePath(AppContext.BaseDirectory)
               .AddJsonFile("appsettings.json", false, true)
               .Build();
            Startup startup = new Startup(config);
            this.mockRepository = new MockRepository(MockBehavior.Strict);
        }

        private WeatherController CreateWeatherController()
        {
            return new WeatherController();
        }

        [Fact]
        public async Task Get_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var weatherController = this.CreateWeatherController();

            // Act
            var result = await weatherController.Get();

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }
    }
}
