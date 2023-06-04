using Microsoft.EntityFrameworkCore;
using react_sw_site.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<EmployeeContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactJSDBConnection"));
});
builder.Services.AddDbContext<LocCoordContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactJSDBConnection"));
});
builder.Services.AddDbContext<ServiceTagsContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactJSDBConnection"));
});
builder.Services.AddMvc();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
