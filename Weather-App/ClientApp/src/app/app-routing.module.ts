import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherForecastDashboardComponent} from './weather-forecast-dashboard/weather-forecast-dashboard.component';
import {AuthorizeGuard} from "../api-authorization/authorize.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/weather-forecast-dashboard',
    pathMatch: 'full'  },
  {
    path: 'weather-forecast-dashboard',
    component: WeatherForecastDashboardComponent,
    canActivate: [AuthorizeGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
