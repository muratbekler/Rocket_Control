using System.Collections.Generic;

namespace Api.Hubs.Model
{
    public class SocketConnectionModel
    {
        public int RocketID { get; set; }
        public HashSet<string> ConnectionId { get; set; }
    }
}
