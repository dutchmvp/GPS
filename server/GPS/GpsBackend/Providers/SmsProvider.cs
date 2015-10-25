using System.Diagnostics;
using Clockwork;
using GpsBackend.Repositories;

namespace GpsBackend.Providers
{
    public static class SmsProvider
    {
        private const string ClockworkSmsKey = "cb19148b6a6266640003feb521e4a018dc8bddcb";
        private static readonly IVolunteerRepository VolunteerRepository = new VolunteerRepository();

        public static void SendSmsToVolunteer(int volunteerId)
        {
            var volunteer = VolunteerRepository.Get(volunteerId);

            if (volunteer != null)
            {
                var mobile = volunteer.Mobile.Replace(" ", "");
                var api = new API(ClockworkSmsKey);
                var result = api.Send(
                    new SMS
                    {
                        To = mobile,
                        Message = "Go help Granny Smith!"
                    });
                if (!result.Success)
                {
                    Debug.WriteLine($"Failed to send SMS to {mobile}");
                    Debug.WriteLine($"Clockwork SMS ErrorCode: {result.ErrorCode}");
                    Debug.WriteLine($"Clockwork SMS ErrorMessage: {result.ErrorMessage}");
                }
            }
        }
    }
}
