import { Injectable } from '@angular/core';
import {WeatherForecast} from '../models/weather-forecast';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherSummaryService {
  baseUrl: string = environment.baseApiUrl + 'WeatherSummary/';
  constructor(private http: HttpClient) { }

  getWeatherSummariesForLocation(locationName: string): Observable<WeatherForecast[]>{
    return this.http.post<WeatherForecast[]>(this.baseUrl + 'GetWeatherSummariesForLocation', {locationName});
  }

}
