using System;

namespace Weather_App.Models
{
    public class WeatherForecast
    {
        public long Id { get; set; }
        public string WeatherStateName { get; set; }
        public string WeatherStateAbbr { get; set; }
        public string WindDirectionCompass { get; set; }
        public DateTime Created { get; set; }
        public DateTime ApplicableDate { get; set; }
        public double MinTemp { get; set; }
        public double MaxTemp { get; set; }
        public double TheTemp { get; set; }
        public double TheTempF => 32 + (int) (TheTemp / 0.5556);
        public double WindSpeed { get; set; }
        public double WindDirection { get; set; }
        public double AirPressure { get; set; }
        public int Humidity { get; set; }
        public double Visibility { get; set; }
        public int Predictability { get; set; }
        public string LocationName { get; set; }
        public string ImgUrl => $"https://www.metaweather.com/static/img/weather/{WeatherStateAbbr}.svg";
    }
}