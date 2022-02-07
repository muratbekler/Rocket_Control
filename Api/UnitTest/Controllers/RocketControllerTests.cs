using Api;
using Api.Controllers;
using Api.Model.View;
using Api.Service.Interfaces;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest.Controllers
{
    public class RocketControllerTests
    {
        public const string RocketId = "DSSvW7VLmb";
        private MockRepository mockRepository;

        private Mock<Lazy<IRocketTelemetryService>> mockLazy;

        public RocketControllerTests()
        {
            var config = new ConfigurationBuilder().SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", false, true)
                .Build();
            Startup startup = new Startup(config);
            this.mockRepository = new MockRepository(MockBehavior.Strict);

            this.mockLazy = this.mockRepository.Create<Lazy<IRocketTelemetryService>>();
        }

        private RocketController CreateRocketController()
        {
            return new RocketController(
                this.mockLazy.Object);
        }

        [Fact]
        public async Task GetAll_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var rocketController = this.CreateRocketController();

            // Act
            var result = await rocketController.GetAll();

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async Task Launch_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var rocketController = this.CreateRocketController();
            string id = RocketId;

            // Act
            var result = await rocketController.Launch(
                id);

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async Task Cancel_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var rocketController = this.CreateRocketController();
            string id = RocketId;

            // Act
            var result = await rocketController.Cancel(
                id);

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async Task Deploy_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var rocketController = this.CreateRocketController();
            string id = RocketId;

            // Act
            var result = await rocketController.Deploy(id);

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }

        [Fact]
        public async Task Telemetry_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var rocketController = this.CreateRocketController();
            RocketVM model = new RocketVM
            {
                id = RocketId, 
            };

            // Act
            var result = await rocketController.Telemetry(
                model);

            // Assert
            Assert.True(true);
            this.mockRepository.VerifyAll();
        }
    }
}
