using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;
using react_sw_site.Context;

namespace react_sw_site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTagsController : ControllerBase
    {
        private ServiceTagsContext _context;

        public ServiceTagsController(ServiceTagsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetServiceTags()
        {
            var serviceTags = await _context.ServiceTags.ToListAsync();
            return Ok(serviceTags);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceTags(int id)
        {
            return Ok(_context.ServiceTags.SingleOrDefault(e => e.ID == id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateServiceTags(ServiceTags serviceTags)
        {
            // Check if the service tag with the same name already exists
            var existingServiceTag = await _context.ServiceTags.FirstOrDefaultAsync(st => st.Service_Name == serviceTags.Service_Name);
            if (existingServiceTag != null)
            {
                return Conflict("Service tag already exists.");
            }

            _context.ServiceTags.Add(serviceTags);
            await _context.SaveChangesAsync();
            return Ok(serviceTags);
        }

        [HttpPut("{id}")]
        public void UpdateServiceTags(int id, ServiceTags serviceTags)
        {
            var existingserviceTags = _context.ServiceTags.SingleOrDefault(e => e.ID == id);
            existingserviceTags.Service_Name = serviceTags.Service_Name;
            _context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceTags(int id)
        {
            var serviceTagsToDelete = await _context.ServiceTags.SingleOrDefaultAsync(e => e.ID == id);
            if (serviceTagsToDelete == null)
            {
                return NotFound("Service tag not found.");
            }

            _context.ServiceTags.Remove(serviceTagsToDelete);
            await _context.SaveChangesAsync();
            return Ok("Service tag deleted successfully.");
        }

    }
}
