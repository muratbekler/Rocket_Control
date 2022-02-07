using Api.Helper;
using Api.Hubs.Class;
using Api.Hubs.Interfaces;
using Api.Model.View;
using Api.Service.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Api.Service.Class
{
    public class RocketTelemetryService : IRocketTelemetryService
    {
        private readonly IHubContext<RocketControlHub, IRocketControlHub> _hubContext;
        private bool _IsConnected { get; set; }
        public bool IsConnect { get => _IsConnected; set => _IsConnected = value; }
        private static Socket sender;
        public RocketTelemetryService(IHubContext<RocketControlHub, IRocketControlHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task TCPConnect(string rocketId, string hostAddress, int portAddress)
        {
            byte[] bytes = new byte[36];
            IPHostEntry host = Dns.GetHostEntry(hostAddress);
            IPAddress ipAddress = host.AddressList[0];
            IPEndPoint remoteEP = new IPEndPoint(ipAddress, portAddress);
            sender = new Socket(ipAddress.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
            sender.Connect(remoteEP);
            while (_IsConnected)
            {
                List<byte> vs = new List<byte>();
                vs.Add(0x82);
                vs.AddRange(Encoding.ASCII.GetBytes(rocketId));
                vs.Add(0x00);
                vs.Add(0x24);
                vs.Add(0x80);

                sender.Send(vs.ToArray());
                sender.Receive(bytes);

                var byteList = bytes.ToList();

                var RocketId = new BufferConvert(byteList, 0x01, 0x0A, true).ReadString2();
                var PacketNumber = new BufferConvert(byteList, 0x0B, 0x0B, true).ReadByte();
                var PacketSize = new BufferConvert(byteList, 0x0C, 0x0C, true).ReadByte();
                var Altitude = new BufferConvert(byteList, 0x0D, 0x10, true).ReadFloat();
                var Speed = new BufferConvert(byteList, 0x11, 0x14, true).ReadFloat();
                var Acceleration = new BufferConvert(byteList, 0x15, 0x18, true).ReadFloat();
                var Thrust = new BufferConvert(byteList, 0x19, 0x1C, true).ReadFloat();
                var Temperature = new BufferConvert(byteList, 0x1D, 0x20, true).ReadFloat();
                RocketVM rocketVM = new RocketVM()
                {
                    id = RocketId,
                    altitude = Altitude,
                    speed = Speed,
                    acceleration = Acceleration,
                    thrust = Thrust,
                    temperature = Temperature,
                };

                await _hubContext.Clients.Group(RocketId).Command(rocketId, rocketVM);

                Console.WriteLine("Altitude  {0} | Speed {1} | Acceleration {2} | Thrust {3} | Temperature {4}", Altitude, Speed, Acceleration, Thrust, Temperature);
            }
        }

        public async Task TCPDisonnect(string rocketId)
        {
            _IsConnected = false;
            sender.Shutdown(SocketShutdown.Both);
            sender.Close();
        }
    }
}
