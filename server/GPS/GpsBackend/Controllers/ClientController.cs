using System.Net;
using System.Web.Http;
using GpsBackend.Models;

namespace GpsBackend.Controllers
{
    [RoutePrefix("api/client")]
    public class ClientController : ApiController
    {
        [Route("location")]
        [HttpPost]
        public IHttpActionResult Location(LocationRequest location)
        {
            return Content(HttpStatusCode.Accepted, "Hello");
        }

        [Route("heartrate")]
        [HttpPost]
        public IHttpActionResult HeartRate(HeartRateRequest heartRate)
        {
            return Ok();
        }

        [Route("panic")]
        [HttpPost]
        public IHttpActionResult PanicButton(PanicRequest panic)
        {
            return Ok();
        }

        [Route("panicover")]
        [HttpPost]
        public IHttpActionResult PanicOver(PanicOverRequest panicOver)
        {
            return Ok();
        }
    }
}
