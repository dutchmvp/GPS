using System.Diagnostics;
using Microsoft.AspNet.SignalR;

namespace GpsBackend.SignalR
{
    public class Notifier : Hub
    {
        public void Message(string message)
        {
            Debug.WriteLine($"notifier.Message({message})");
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.message(message);
        }

        public void RoomUpdate(int roomId)
        {
            Debug.WriteLine($"notifier.RoomUpdate({roomId})");
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.roomUpdate(roomId);
        }

        public void HeartRateUpdate(double heartRate, int timestamp)
        {
            Debug.WriteLine($"notifier.HeartRateUpdate({heartRate}, {timestamp})");
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.heartRateUpdate(heartRate, timestamp);
        }

        public void Panic()
        {
            Debug.WriteLine("notifier.Panic()");
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.panic();
        }

        public void PanicOver()
        {
            Debug.WriteLine("notifier.PanicOver()");
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.panicOver();
        }
    }
}
