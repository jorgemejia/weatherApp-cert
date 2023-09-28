import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {ForecastData} from "../../interfaces/forecast.interface";
import {take} from "rxjs";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit{
  public locationForecast: ForecastData = {} as ForecastData;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    const zipCode = this.route.snapshot.paramMap.get('zipcode');
    if(zipCode){
      this.httpService.getForecast(zipCode).pipe(take(1)).subscribe((data: ForecastData) => {
        this.locationForecast = data;
      });
    }
  }

}
