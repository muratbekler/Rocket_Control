using System;

namespace Api.Model.View
{
    public class TimestampsVM
    {
        public DateTime? launched { get; set; }
        public DateTime? deployed { get; set; }
        public DateTime? failed { get; set; }
        public DateTime? cancelled { get; set; }
    }
}
