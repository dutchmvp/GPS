using System;
using System.Collections.Generic;
using System.Linq;
using GpsBackend.Models;

namespace GpsBackend.Repositories
{
    public class VolunteerRepository : IVolunteerRepository
    {
        // TODO: load this from a JSON file.
        private static readonly IList<Volunteer> Volunteers = new List<Volunteer>();

        public IEnumerable<Volunteer> GetAll()
        {
            return Volunteers;
        }

        public Volunteer Get(int id)
        {
            return Volunteers.SingleOrDefault(v => v.Id == id);
        }

        public Volunteer Add(Volunteer volunteer)
        {
            volunteer.Id = Volunteers.Any() ? Volunteers.Max(v => v.Id) + 1 : 1;
            Volunteers.Add(volunteer);
            return volunteer;
        }

        public void Update(int id, Action<Volunteer> f)
        {
            var v = Get(id);
            if (v != null) f(v);
        }
    }
}
