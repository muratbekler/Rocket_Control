namespace Api.Model.View
{
    public class RocketVM
    {
        public string id { get; set; }
        public string model { get; set; }
        public float mass { get; set; }
        public PayloadVM payload { get; set; }
        public TelemetryVM telemetry { get; set; }
        public string status { get; set; }
        public TimestampsVM timestamps { get; set; }
        public float altitude { get; set; }
        public float speed { get; set; }
        public float acceleration { get; set; }
        public float thrust { get; set; }
        public float temperature { get; set; }

    }
}
