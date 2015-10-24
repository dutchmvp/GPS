namespace GpsBackend.Models
{
    public class Volunteer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LasttName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string PostCode { get; set; }
        public bool Availability { get; set; }
    }
}
