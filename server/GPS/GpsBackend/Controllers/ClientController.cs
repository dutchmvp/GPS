using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web.Http;
using GpsBackend.Models;
using GpsBackend.Providers;
using GpsBackend.SignalR;

namespace GpsBackend.Controllers
{
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        private static readonly  IList<LocationRequest> LocationRequests = new List<LocationRequest>();
        private static readonly  IList<HeartRateRequest> HeartRateRequests = new List<HeartRateRequest>();

        [Route("ping")]
        [HttpGet]
        public IHttpActionResult Ping()
        {
            return Content(HttpStatusCode.Accepted, "Pong");
        }

        [Route("location")]
        [HttpPost]
        public IHttpActionResult Location(LocationRequest location)
        {
            Debug.WriteLine("Location");
            Debug.WriteLine($"{location.Id}");
            Debug.WriteLine($"{location.Timestamp}");
            if (location.Locations != null)
            {
                for (var i = 0; i < location.Locations.Count; i++)
                {
                    Debug.WriteLine($"{location.Locations[i].Uuid}");
                    Debug.WriteLine($"{location.Locations[i].MajorNumber}");
                    Debug.WriteLine($"{location.Locations[i].MinorNumber}");
                    Debug.WriteLine($"{location.Locations[i].Strength}");
                }
            }

            LocationRequests.Add(location);
            var notifier = new Notifier();
            var roomId = 1;
            var x = location.Locations?.FirstOrDefault(l => l.MajorNumber == 56279 && l.MinorNumber == 21017);
            if (x != null) roomId = 2;
            notifier.RoomUpdate(roomId);

            return Content(HttpStatusCode.OK, new {});
        }

        [Route("heartrate")]
        [HttpPost]
        public IHttpActionResult HeartRate(HeartRateRequest heartRate)
        {
            Debug.WriteLine("HeartRate");
            Debug.WriteLine($"{heartRate.Id}");
            Debug.WriteLine($"{heartRate.Timestamp}");
            Debug.WriteLine($"{heartRate.HeartRate}");
            HeartRateRequests.Add(heartRate);
            var notifier = new Notifier();
            notifier.HeartRateUpdate(heartRate.HeartRate, heartRate.Timestamp);
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panic")]
        [HttpPost]
        public IHttpActionResult Panic(PanicRequest panic)
        {
            Debug.WriteLine("Panic");
            Debug.WriteLine($"{panic.Id}");
            Debug.WriteLine($"{panic.Timestamp}");
            var notifier = new Notifier();
            notifier.Panic();
            SmsProvider.SendSmsToVolunteer(1);
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panicover")]
        [HttpPost]
        public IHttpActionResult PanicOver(PanicOverRequest panicOver)
        {
            Debug.WriteLine("PanicOver");
            Debug.WriteLine($"{panicOver.Id}");
            Debug.WriteLine($"{panicOver.Timestamp}");
            var notifier = new Notifier();
            notifier.PanicOver();
            return Content(HttpStatusCode.OK, new { });
        }
    }
}
