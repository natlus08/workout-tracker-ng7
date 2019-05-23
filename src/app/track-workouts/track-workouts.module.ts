import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { TrackComponent } from './track/track.component';
import { NavbarComponent } from '../navbar/navbar.component';
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
    FormsModule
  ],
  declarations: [ TrackComponent ],
  providers: [ WorkoutService]
})
export class TrackWorkoutsModule { }