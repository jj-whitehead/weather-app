import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import {AppRoutingModule} from "./app-routing.module";
import {WeatherSummaryService} from "./services/weather-summary.service";
import {WeatherForecastDashboardComponent} from "./weather-forecast-dashboard/weather-forecast-dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    WeatherForecastDashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    WeatherSummaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
