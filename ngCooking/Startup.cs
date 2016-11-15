using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ngCooking.Startup))]
namespace ngCooking
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
