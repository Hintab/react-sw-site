using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_sw_site.Models;
using react_sw_site.Context;

namespace react_sw_site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocContactDetailsController : ControllerBase
    {
        private LocContactDetailsContext _context;

        public LocContactDetailsController(LocContactDetailsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocContactDetails()
        {
            var contactDetails = await _context.LocContactDetails.ToListAsync();
            return Ok(contactDetails);
        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> GetLocContactDetailsToEdit(int id)
        {
            return Ok(_context.LocContactDetails.SingleOrDefault(e => e.ContactID == id));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocContactDetails(int id)
        {
            var contactDetails = await _context.LocContactDetails
                .Where(e => e.LocID == id)
                .ToListAsync();

            return Ok(contactDetails);
        }

        [HttpPost]
        public void CreateLocContactDetails(LocContactDetails locContactDetails)
        {
            _context.LocContactDetails.Add(locContactDetails);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void UpdateLocContactDetails(int id, LocContactDetails locContactDetails)
        {
            var existingLocContactDetails = _context.LocContactDetails.SingleOrDefault(e => e.ContactID == id);
            existingLocContactDetails.ContactName = locContactDetails.ContactName;
            existingLocContactDetails.ContactPhoneNum = locContactDetails.ContactPhoneNum;
            existingLocContactDetails.ContactEmailAdd = locContactDetails.ContactEmailAdd;
            existingLocContactDetails.ContactPosition = locContactDetails.ContactPosition;
            existingLocContactDetails.ContactFaxNum = locContactDetails.ContactFaxNum;
            existingLocContactDetails.ContactNotes = locContactDetails.ContactNotes;
            _context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void DeleteLocContactDetails(int id)
        {
            var locContactDetailsToDelete = _context.LocContactDetails.SingleOrDefault(e => e.ContactID == id);
            _context.LocContactDetails.Remove(locContactDetailsToDelete);
            _context.SaveChanges();
        }
    }
}
