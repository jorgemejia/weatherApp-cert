import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable} from "rxjs";
import {WeatherData} from "../interfaces/whater.interface";
import {ForecastData} from "../interfaces/forecast.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://api.weatherapi.com/v1/'
  private apiKey = '116153f8e53f4ab98ea123409232609'
  private apiURL = `${this.url}current.json?key=${this.apiKey}&q=`

  constructor(private http: HttpClient) { }

  getCurrentWeatherBulk(location: number[]): Observable<WeatherData[]> {
    const apiRequests: any[] = [];
    location.map((zipCode: number) => {
      apiRequests.push(this.http.get<WeatherData>(`${this.url}current.json?key=${this.apiKey}&q=${zipCode}&aqi=no`))
    });
    return combineLatest<WeatherData[]>(apiRequests);
  }

  getCurrentWeather(location: number) : Observable<WeatherData> {
    const apiUrl = `${this.url}current.json?key=${this.apiKey}&q=${location}&aqi=no`;
    return this.http.get<WeatherData>(apiUrl);
  }

  getForecast(location: string): Observable<ForecastData> {
    const apiUrl = `${this.url}forecast.json?key=${this.apiKey}&q=${location}&days=5&aqi=no&alerts=no`
    return this.http.get<ForecastData>(apiUrl)
  }
}


// http://api.weatherapi.com/v1/current.json?key=116153f8e53f4ab98ea123409232609&q=90001&days=5&aqi=no&alerts=no
// http://api.weatherapi.com/v1/forecast.json?key=116153f8e53f4ab98ea123409232609&q=90009&days=5&aqi=no&alerts=no
