namespace Api.Model.Interceptor
{
    public class ResponseDatum
    {
        public bool isSuccessful { get; set; }
        public string message { get; set; }
        public object datum { get; set; }
        public ResponseDatum()
        {

        }
        public ResponseDatum(object _datum)
        {
            datum = _datum;
        }
    }
}
