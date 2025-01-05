using Microsoft.AspNetCore.Cors.Infrastructure;

namespace ap.api.Services
{
    public static class CorsPolicyExtension
    {
        public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
        {
            // Step 1: Configure CORS to read from appsettings.json
            services.Configure<CorsOptions>(options =>
            {
                var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();
                if (allowedOrigins != null && allowedOrigins.Any())
                {
                    options.AddPolicy("AllowSpecificOrigins", policy =>
                    {
                        policy.WithOrigins(allowedOrigins)  // Add allowed origins from appsettings.json
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                }
            });

            services.AddCors(options =>
             {
                 options.AddPolicy("AllowSpecificOrigins", policy =>
                 {
                     policy.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>())
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                 });
             });

            return services;
        }
    }
}
