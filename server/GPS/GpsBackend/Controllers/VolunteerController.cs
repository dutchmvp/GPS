using System.Linq;
using System.Net;
using System.Web.Http;
using GpsBackend.Models;
using GpsBackend.Repositories;

namespace GpsBackend.Controllers
{
    [RoutePrefix("api/volunteer")]
    public class VolunteerController : ApiController
    {
        private readonly IVolunteerRepository _volunteerRepository;

        public VolunteerController()
        {
            _volunteerRepository = new VolunteerRepository();
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            return Ok(_volunteerRepository.GetAll());
        }

        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Ok(_volunteerRepository.Get(id));
        }

        [Route("register")]
        [HttpPost]
        public IHttpActionResult Register(RegisterRequest register)
        {
            var volunteer = new Volunteer
            {
                FirstName = register.FirstName,
                LastName = register.LastName,
                Mobile = register.Mobile,
                Email = register.Email,
                PostCode = register.PostCode,
                PasswordHash = register.PasswordHash,
                Availability = false
            };
            var volunteerWithId = _volunteerRepository.Add(volunteer);
            return Ok(volunteerWithId);
        }

        [Route("availability")]
        [HttpPost]
        public IHttpActionResult Availability(AvailabilityRequest availability)
        {
            _volunteerRepository.Update(availability.Id, v => v.Availability = availability.Availability);
            return Ok();
        }

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(LoginRequest login)
        {
            var match = _volunteerRepository.GetAll().FirstOrDefault(v =>
                v.Email.ToLower() == login.Email.ToLower() &&
                v.PasswordHash == login.PasswordHash);
            if (match == null) return Content(HttpStatusCode.Forbidden, "");
            return Ok(match);
        }
    }
}
