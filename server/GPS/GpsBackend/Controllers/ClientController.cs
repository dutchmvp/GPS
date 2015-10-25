using System.Collections.Generic;
using System.Diagnostics;
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
            return Content(HttpStatusCode.OK, new {});
        }

        [Route("heartrate")]
        [HttpPost]
        public IHttpActionResult HeartRate(HeartRateRequest heartRate)
        {
            HeartRateRequests.Add(heartRate);
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panic")]
        [HttpPost]
        public IHttpActionResult PanicButton(PanicRequest panic)
        {
            var notifier = new Notifier();
            notifier.Panic();
            SmsProvider.SendSmsToVolunteer(1);
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panicover")]
        [HttpPost]
        public IHttpActionResult PanicOver(PanicOverRequest panicOver)
        {
            var notifier = new Notifier();
            notifier.PanicOver();
            return Content(HttpStatusCode.OK, new { });
        }
    }
}
