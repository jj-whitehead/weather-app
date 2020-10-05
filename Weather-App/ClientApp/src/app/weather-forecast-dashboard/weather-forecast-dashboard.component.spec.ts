import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastDashboardComponent } from './weather-forecast-dashboard.component';

describe('WeatherForecastDashboardComponent', () => {
  let component: WeatherForecastDashboardComponent;
  let fixture: ComponentFixture<WeatherForecastDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherForecastDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
