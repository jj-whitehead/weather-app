using System;

namespace Weather_App.Models
{
    public class LocationResponse
    {
        public string Title { get; set; }
        public string LocationType { get; set; }
        public string Woeid { get; set; }
        public string LongitudeLatitude { get; set; }
    }
}