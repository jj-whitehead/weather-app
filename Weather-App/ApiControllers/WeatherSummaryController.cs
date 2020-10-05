using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Weather_App.Models;

namespace Weather_App.ApiControllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class WeatherSummaryController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> GetWeatherSummariesForLocation(
            WeatherForecastApiRequest weatherForecastApiRequest)
        {
            if (weatherForecastApiRequest == null) return BadRequest();
            var weatherSummaries = await RetrieveWeatherSummaries(weatherForecastApiRequest);
            return Ok(weatherSummaries);
        }

        private async Task<LocationResponse> GetWhereOnEarthID(WeatherForecastApiRequest weatherForecastApiRequest)
        {
            var apiUri = $"location/search/?query={weatherForecastApiRequest.LocationName}";
            using var client = new HttpClient();
            var response = await client.GetAsync($"{SettingsProvider.WeatherApiUri}{apiUri}");
            var result = response.Content.ReadAsStringAsync().Result;
            var jObjects = JsonConvert.DeserializeObject<JObject[]>(result);
            if (jObjects.Length <= 0) return null;
            var location = new LocationResponse()
            {
                Title = jObjects.First().SelectToken("title").Value<string>(),
                LocationType = jObjects.First().SelectToken("location_type").Value<string>(),
                Woeid = jObjects.First().SelectToken("woeid").Value<string>(),
                LongitudeLatitude = jObjects.First().SelectToken("latt_long").Value<string>(),
            };
            return location;
        }

        private async Task<List<WeatherForecast>> RetrieveWeatherSummaries(
            WeatherForecastApiRequest weatherForecastApiRequest)
        {
            var locationResponse = await GetWhereOnEarthID(weatherForecastApiRequest);
            if (locationResponse == null) return null;
            var apiUri = $"{SettingsProvider.WeatherApiUri}location/{locationResponse.Woeid}/";
            using var client = new HttpClient();
            var response = await client.GetAsync(apiUri);
            var result = response.Content.ReadAsStringAsync().Result;
            if (result == null) return null;
            var weatherForecastJObject = JsonConvert.DeserializeObject<JObject>(result);
            var consolidatedWeather = weatherForecastJObject.SelectTokens("consolidated_weather").Values().ToList();
            var weatherForecasts = consolidatedWeather.Select(jToken => new WeatherForecast()
                {
                    Id = jToken.SelectToken("id").Value<long>(),
                    WeatherStateName = jToken.SelectToken("weather_state_name").Value<string>(),
                    WeatherStateAbbr = jToken.SelectToken("weather_state_abbr").Value<string>(),
                    WindDirectionCompass = jToken.SelectToken("wind_direction_compass").Value<string>(),
                    Created = jToken.SelectToken("created").Value<DateTime>(),
                    ApplicableDate = jToken.SelectToken("applicable_date").Value<DateTime>(),
                    MinTemp = jToken.SelectToken("max_temp").Value<double>(),
                    MaxTemp = jToken.SelectToken("max_temp").Value<double>(),
                    TheTemp = jToken.SelectToken("the_temp").Value<double>(),
                    WindSpeed = jToken.SelectToken("wind_speed").Value<double>(),
                    WindDirection = jToken.SelectToken("wind_direction").Value<double>(),
                    AirPressure = jToken.SelectToken("air_pressure").Value<double>(),
                    Humidity = jToken.SelectToken("humidity").Value<int>(),
                    Visibility = jToken.SelectToken("visibility").Value<double>(),
                    Predictability = jToken.SelectToken("predictability").Value<int>(),
                    LocationName = locationResponse.Title
                })
                .ToList();
            return weatherForecasts;
        }
    }
}