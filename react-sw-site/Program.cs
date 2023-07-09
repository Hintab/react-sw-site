using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql;
using react_sw_site.Context;
using react_sw_site.Models;

string serverName = Environment.GetEnvironmentVariable("SERVER_NAME");
string databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME");
string databaseUsername = Environment.GetEnvironmentVariable("DATABASE_USERNAME");
string databasePassword = Environment.GetEnvironmentVariable("DATABASE_PASSWORD");

// Build the connection string
string connectionString = $"Server={serverName};Database={databaseName};Uid={databaseUsername};Pwd={databasePassword};";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<EmployeeContext>((serviceProvider, options) =>
{
    options.UseMySql(connectionString, new MySqlServerVersion("8.0.33"));
});
builder.Services.AddDbContext<LocCoordContext>((serviceProvider, options) =>
{
    options.UseMySql(connectionString, new MySqlServerVersion("8.0.33"));
});
builder.Services.AddDbContext<LocContactDetailsContext>((serviceProvider, options) =>
{
    options.UseMySql(connectionString, new MySqlServerVersion("8.0.33"));
});
builder.Services.AddDbContext<ServiceTagsContext>((serviceProvider, options) =>
{
    options.UseMySql(connectionString, new MySqlServerVersion("8.0.33"));
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

app.MapFallbackToFile("index.html");

app.Run();
