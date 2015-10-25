using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using GpsBackend.Models;
using Newtonsoft.Json;

namespace GpsBackend.Repositories
{
    public class VolunteerRepository : IVolunteerRepository
    {
        private IList<Volunteer> _volunteers;

        public VolunteerRepository()
        {
            Load();
        }

        public IEnumerable<Volunteer> GetAll()
        {
            return _volunteers;
        }

        public Volunteer Get(int id)
        {
            return _volunteers.SingleOrDefault(v => v.Id == id);
        }

        public Volunteer Add(Volunteer volunteer)
        {
            volunteer.Id = _volunteers.Any() ? _volunteers.Max(v => v.Id) + 1 : 1;
            _volunteers.Add(volunteer);
            Save();
            return volunteer;
        }

        public void Update(int id, Action<Volunteer> f)
        {
            var v = Get(id);
            if (v != null)
            {
                f(v);
                Save();
            }
        }

        private const string FileName = @"c:\users\taylorjg\documents\Volunteers.txt";

        private void Save()
        {
            var json = JsonConvert.SerializeObject(_volunteers);
            File.WriteAllText(FileName, json);
        }

        private void Load()
        {
            if (File.Exists(FileName))
            {
                var json = File.ReadAllText(FileName);
                if (json.Length > 0)
                {
                    _volunteers = JsonConvert.DeserializeObject<List<Volunteer>>(json);
                    return;
                }
            }
            _volunteers = new List<Volunteer>();
        }
    }
}
