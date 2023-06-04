using Microsoft.AspNetCore.Mvc;

namespace react_sw_site.Models
{
    public class LocCoord
    {
        public int ID { get; set; }

        public string? Latitude { get; set; }

        public string? Longitude { get; set; }
        
        public string? Loc_Name { get; set; }

        public string? Loc_Address { get; set; }

        public string? Phone_Num { get; set; }

        public string? Service_Tags { get; set; }
    }
}