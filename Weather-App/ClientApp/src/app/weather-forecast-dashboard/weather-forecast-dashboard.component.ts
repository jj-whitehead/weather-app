import { Component, OnInit } from '@angular/core';
import {WeatherForecast} from '../models/weather-forecast';
import {Subscription} from 'rxjs';
import {WeatherSummaryService} from "../services/weather-summary.service";

@Component({
  selector: 'app-weather-forecast-dashboard',
  templateUrl: './weather-forecast-dashboard.component.html',
  styleUrls: ['./weather-forecast-dashboard.component.css']
})
export class WeatherForecastDashboardComponent implements OnInit {
  weatherForecasts: WeatherForecast[];
  firstWeatherForecastToDisplay: WeatherForecast;
  searchLocationName: string;
  weatherForecastsLoading: any;
  weatherForecastsSearchSubscribed: Subscription = Subscription.EMPTY;

  constructor(private weatherSummaryService: WeatherSummaryService) {
    this.searchLocationName = 'Belfast';
    this.weatherForecastsLoading = false;
  }
  ngOnInit(): void {
    this.getWeatherForLocation();
  }

  searchClick() {
  this.getWeatherForLocation();
  }
  getWeatherForLocation(){
    this.weatherForecastsLoading = true;
    if (this.weatherForecastsSearchSubscribed !== null && !this.weatherForecastsSearchSubscribed.closed){
      this.weatherForecastsSearchSubscribed.unsubscribe();
    }
    this.weatherForecastsSearchSubscribed = this.weatherSummaryService.getWeatherSummariesForLocation(this.searchLocationName)
      .subscribe(weatherSummaries => {
      if (weatherSummaries && weatherSummaries.length > 0) {
        const foundIndex = weatherSummaries.findIndex(weatherSummary => {
          const today = new Date();
          const applicableDate = new Date(weatherSummary.applicableDate);
          return applicableDate.getDay() === today.getDay();
        });
        if (foundIndex > -1) {
          this.firstWeatherForecastToDisplay = weatherSummaries[foundIndex];
          this.weatherForecasts = weatherSummaries.filter(w => w.id !== this.firstWeatherForecastToDisplay.id);
          this.weatherForecastsLoading = false;
        }
      }
    });
  }
}
