using System;

namespace Api.Model.View
{

    public class WeatherVM
    {
        public float temperature { get; set; }
        public float humidity { get; set; }
        public float pressure { get; set; }
        public PrecipitationVM precipitation { get; set; }
        public WindVM wind { get; set; }
        public DateTime time { get; set; }
    }
}
