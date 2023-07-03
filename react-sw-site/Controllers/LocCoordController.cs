using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;
using react_sw_site.Context;

namespace react_sw_site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocCoordController : ControllerBase
    {
        private LocCoordContext _context;

        public LocCoordController(LocCoordContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocCoords()
        {
            var locCoords = await _context.LocCoord.ToListAsync();
            return Ok(locCoords);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocCoord(int id)
        {
            return Ok(_context.LocCoord.SingleOrDefault(e => e.ID == id));
        }

        [HttpPost]
        public void CreateLocCoord(LocCoord locCoord)
        {
            _context.LocCoord.Add(locCoord);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void UpdateLocCoord(int id, LocCoord locCoord)
        {
            var existingLocCoord = _context.LocCoord.SingleOrDefault(e => e.ID == id);
            existingLocCoord.Latitude = locCoord.Latitude;
            existingLocCoord.Longitude = locCoord.Longitude;
            existingLocCoord.Loc_Name = locCoord.Loc_Name;
            existingLocCoord.Loc_Address = locCoord.Loc_Address;
            existingLocCoord.Phone_Num = locCoord.Phone_Num;
            existingLocCoord.Service_Tags = locCoord.Service_Tags;
            _context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void DeleteLocCoord(int id)
        {
            var locCoordToDelete = _context.LocCoord.SingleOrDefault(e => e.ID == id);
            _context.LocCoord.Remove(locCoordToDelete);
            _context.SaveChanges();
        }
    }
}
