using System;
using System.Collections.Generic;

namespace GpsBackend.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T Get(int id);
        T Add(T t);
        void Update(int id, Action<T> f);
    }
}
