using Microsoft.AspNet.SignalR;

namespace GpsBackend.SignalR
{
    public class Notifier : Hub
    {
        public void Message(string message)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.message(message);
        }

        public void RoomUpdate(int roomId)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.roomUpdate(roomId);
        }

        public void HeartRateUpdate(int heartRate)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.heartRateUpdate(heartRate);
        }

        public void Panic()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.panic();
        }

        public void PanicOver()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            hubContext.Clients.All.panicOver();
        }
    }
}
