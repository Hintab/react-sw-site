using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_sw_site.Context;
using react_sw_site.Models;

namespace react_sw_site.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private EmployeeContext _context;

        public EmployeesController(EmployeeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employeess = await _context.Employees.ToListAsync();
            return Ok(employeess);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            return Ok(_context.Employees.SingleOrDefault(e => e.ID == id));
        }

        [HttpPost]
        public void CreateEmployee(Employees employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void UpdateEmployee(int id, Employees employee)
        {
            var existingEmployee = _context.Employees.SingleOrDefault(e => e.ID == id);
            existingEmployee.Name = employee.Name;
            existingEmployee.Email = employee.Email;
            _context.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void DeleteEmployee(int id)
        {
            var employeeToDelete = _context.Employees.SingleOrDefault(e => e.ID == id);
            _context.Employees.Remove(employeeToDelete);
            _context.SaveChanges();
        }
    }
}
