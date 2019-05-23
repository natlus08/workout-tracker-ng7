import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { StartworkoutComponent } from './startworkout/startworkout.component';
import { NavbarComponent } from '../navbar/navbar.component';
//import services
import { WorkoutService } from '../services/workout.service';

const routes: Routes = [
  { path: '', component: StartworkoutComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ StartworkoutComponent ],
  providers: [ WorkoutService ]
})
export class StartWorkoutModule { }