export class WeatherForecastApiRequest {
  constructor(locationName?: string) {
    this.locationName = locationName || '';
  }
  locationName: string;
}
