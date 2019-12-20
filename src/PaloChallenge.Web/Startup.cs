using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PaloChallenge.Application.DataSources;
using PaloChallenge.Application.Models;
using PaloChallenge.Application.Models.Options;
using PaloChallenge.Application.Repositories;
using PaloChallenge.Application.Services;

namespace PaloChallenge.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IMemoryCache, MemoryCache>();
            services.AddSingleton<IExternalData<Hospital>, HospitalData>();
            services.AddSingleton<IExternalData<Illness>, IllnessData>();

            services.AddSingleton<IPatientRepository, PatientRepository>();
            services.AddSingleton<IHospitalRepository, HospitalRepository>();

            services.AddSingleton<IHospitalService, HospitalService>();
            services.AddSingleton<IIllnessService, IllnessService>();

            services.Configure<ExternalOptions>(Configuration.GetSection("External"));
            services.AddHttpClient();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (!env.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.Map("/api", apiApp =>
            {
                apiApp.UseRouting();
                apiApp.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{action=Index}/{id?}");
                });
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp/build";
                spa.Options.DefaultPage = "/index.html";
            });
        }
    }
}
