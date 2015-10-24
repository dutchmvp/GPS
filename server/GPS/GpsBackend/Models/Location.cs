using System.Collections.Generic;

namespace GpsBackend.Models
{
    public class Location
    {
        public string Id { get; set; }
        public int Timestamp { get; set; }
        public IList<BeaconLocation> Locations { get; set; }
    }
}
