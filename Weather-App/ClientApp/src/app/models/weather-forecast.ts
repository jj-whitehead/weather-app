export interface WeatherForecast {
  id: number;
  weatherStateName: string;
  weatherStateAbbr: string;
  windDirectionCompass: string;
  created: Date;
  applicableDate: Date;
  minTemp: number;
  maxTemp: number;
  theTemp: number;
  theTempF: number;
  windSpeed: number;
  windDirection: number;
  airPressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
  imgUrl: string;
  locationName: string;
}
