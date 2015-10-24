using System.Net;
using System.Web.Http;
using GpsBackend.Models;

namespace GpsBackend.Controllers
{
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
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
            return Content(HttpStatusCode.OK, new {});
        }

        [Route("heartrate")]
        [HttpPost]
        public IHttpActionResult HeartRate(HeartRateRequest heartRate)
        {
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panic")]
        [HttpPost]
        public IHttpActionResult PanicButton(PanicRequest panic)
        {
            return Content(HttpStatusCode.OK, new { });
        }

        [Route("panicover")]
        [HttpPost]
        public IHttpActionResult PanicOver(PanicOverRequest panicOver)
        {
            return Content(HttpStatusCode.OK, new { });
        }
    }
}
