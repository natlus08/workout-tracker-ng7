import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

//import components
import { EndworkoutComponent } from './endworkout/endworkout.component';
//import services
import { WorkoutService } from '../services/workout.service';

const routes: Routes = [
  { path: '', component: EndworkoutComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ EndworkoutComponent ],
  providers: [ WorkoutService]
})
export class EndWorkoutModule { }