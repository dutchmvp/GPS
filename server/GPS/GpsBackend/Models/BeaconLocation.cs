using System;

namespace GpsBackend.Models
{
    public class BeaconLocation
    {
        public Guid Uuid { get; set; }
        public int MajorNumber { get; set; }
        public int MinorNumber { get; set; }
        public double Strength { get; set; }
    }
}
