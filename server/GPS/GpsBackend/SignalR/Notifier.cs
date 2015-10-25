using System;
using Microsoft.AspNet.SignalR;

namespace GpsBackend.SignalR
{
    public class Notifier : Hub
    {
        public void Message(string message)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            var client = hubContext.Clients.All.message(message);
        }

        public void Message(string connectionId, string message)
        {
            InvokeClientMethod(connectionId, client => client.message(message));
        }

        private static void InvokeClientMethod(string connectionId, Action<dynamic> action)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<Notifier>();
            var client = hubContext.Clients.Client(connectionId);
            action(client);
        }
    }
}
