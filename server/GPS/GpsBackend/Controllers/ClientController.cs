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
        public IHttpActionResult Location(Location location)
        {
            return Content(HttpStatusCode.Accepted, "Hello");
        }
    }
}
