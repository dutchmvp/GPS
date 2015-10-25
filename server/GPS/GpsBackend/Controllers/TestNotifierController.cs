using System.Web.Http;
using Clockwork;
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

        [Route("heartrateupdate/{heartRate}")]
        [HttpGet]
        public IHttpActionResult HeartRateUpdate(int heartRate)
        {
            var notifier = new Notifier();
            notifier.HeartRateUpdate(heartRate);
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
            var volunteer = _volunteerRepository.Get(volunteerId);

            if (volunteer != null)
            {
                var api = new API("cb19148b6a6266640003feb521e4a018dc8bddcb");
                var result = api.Send(
                    new SMS
                    {
                        To = volunteer.Mobile.Replace(" ", ""),
                        Message = "Go help Granny Smith!"
                    });
            }

            return Ok();
        }
    }
}
