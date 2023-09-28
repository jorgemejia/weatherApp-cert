import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import {HttpService} from '../../services/http.service';
import {WeatherData} from "../../interfaces/whater.interface";
import {take} from "rxjs";

@Component({
  selector: 'app-weather-condition',
  templateUrl: './weather-condition.component.html',
  styleUrls: ['./weather-condition.component.scss']
})
export class WeatherConditionComponent implements OnChanges, OnInit {
  @Input() zipCodes: number[] = [];
  public locationsWeather: WeatherData[] = [];
  constructor(private httpService: HttpService, private localStorage: LocalStorageService) {
  }


  deleteItem(index: number) {
    this.locationsWeather.splice(index, 1);
    this.localStorage.deleteItem('locations', index);
  }

  ngOnInit() {
    if (this.zipCodes.length > 0) {
      this.getWeatherFromZipCodes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const lastElement = this.zipCodes.slice(-1)[0];
    this.getSingleWeatherFromZipCode(lastElement);
  }

  getWeatherFromZipCodes() {
    this.httpService.getCurrentWeatherBulk(this.zipCodes).pipe(take(1)).subscribe((data: WeatherData[]) => {
      this.locationsWeather = data;
    });
  }

  getSingleWeatherFromZipCode(zipCode: number) {
    this.httpService.getCurrentWeather(zipCode).pipe(take(1)).subscribe((data: WeatherData) => {
      this.locationsWeather.push(data);
    });
  }

}
