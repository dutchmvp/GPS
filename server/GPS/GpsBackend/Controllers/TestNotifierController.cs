using System.Web.Http;
using GpsBackend.Providers;
using GpsBackend.Repositories;
using GpsBackend.SignalR;

namespace GpsBackend.Controllers
{
    [RoutePrefix("api/testnotifier")]
    public class TestNotifierController : ApiController
    {
        private readonly IVolunteerRepository _volunteerRepository;

        public TestNotifierController()
        {
            _volunteerRepository = new VolunteerRepository();
        }

        [Route("roomupdate/{roomId}")]
        [HttpGet]
        public IHttpActionResult RoomUpdate(int roomId)
        {
            var notifier = new Notifier();
            notifier.RoomUpdate(roomId);
            return Ok();
        }

        [Route("heartrateupdate/{heartRate}/{timestamp}")]
        [HttpGet]
        public IHttpActionResult HeartRateUpdate(int heartRate, int timestamp)
        {
            var notifier = new Notifier();
            notifier.HeartRateUpdate(heartRate, timestamp);
            return Ok();
        }

        [Route("panic")]
        [HttpGet]
        public IHttpActionResult Panic()
        {
            var notifier = new Notifier();
            notifier.Panic();
            return Ok();
        }

        [Route("panicover")]
        [HttpGet]
        public IHttpActionResult PanicOver()
        {
            var notifier = new Notifier();
            notifier.PanicOver();
            return Ok();
        }

        [Route("sms/{volunteerId}")]
        [HttpGet]
        public IHttpActionResult Sms(int volunteerId)
        {
            SmsProvider.SendSmsToVolunteer(volunteerId);
            return Ok();
        }
    }
}
