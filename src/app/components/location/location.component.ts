import { Component, OnInit} from '@angular/core';
import { LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public location: number = 0;
  public locations: number[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.locations = this.localStorageService.getItemArray('locations');
  }

  addLocation() {
      if (!this.locations.includes(this.location)) {
        this.locations = [...this.locations, this.location];
        this.localStorageService.setItemArray('locations', this.locations);
      }
  }
}
