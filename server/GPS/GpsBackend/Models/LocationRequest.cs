using System.Collections.Generic;

namespace GpsBackend.Models
{
    public class LocationRequest : ClientBaseRequest
    {
        public IList<BeaconLocation> Locations { get; set; }
    }
}
