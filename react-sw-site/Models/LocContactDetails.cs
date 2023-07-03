using Microsoft.AspNetCore.Mvc;

namespace react_sw_site.Models
{
    public class LocContactDetails
    {
        public int ContactID { get; set; }

        public int LocID { get; set; }

        public string? ContactName { get; set; }

        public string? ContactPhoneNum { get; set; }
        
        public string? ContactEmailAdd { get; set; }

        public string? ContactPosition { get; set; }

        public string? ContactFaxNum { get; set; }

        public string? ContactNotes { get; set; }
    }
}