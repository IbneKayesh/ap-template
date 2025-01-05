using ap.api.DBC;
using ap.api.Infra;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddScoped<RawSql>();
builder.Services.AddScoped<XecuteService>();

// Step 1: Configure CORS to read from appsettings.json
builder.Services.AddCorsPolicy(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

// Step 2: Use CORS middleware
app.UseCors("AllowSpecificOrigins");

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
