import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

//import components
import { TrackComponent } from './track/track.component';
//import services
import { WorkoutService } from '../services/workout.service';

const routes: Routes = [
  { path: '', component: TrackComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule,
    ChartModule
  ],
  declarations: [ TrackComponent ],
  providers: [ WorkoutService]
})
export class TrackWorkoutsModule { }