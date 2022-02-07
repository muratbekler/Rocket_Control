namespace Api.Model.View
{
    public class PrecipitationVM
    {
        public float probability { get; set; }
        public bool rain { get; set; }
        public bool snow { get; set; }
        public bool sleet { get; set; }
        public bool hail { get; set; }
    }
}
