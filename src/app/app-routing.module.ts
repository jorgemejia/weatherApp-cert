import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ForecastComponent} from "./components/forecast/forecast.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'forecast/:zipcode',
    component: ForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
