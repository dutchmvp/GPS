using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(GpsBackend.Startup))]

namespace GpsBackend
{
    public partial class Startup
    {
        // ReSharper disable once UnusedMember.Global
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
