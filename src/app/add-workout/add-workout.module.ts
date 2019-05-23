import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AddworkoutComponent } from './addworkout/addworkout.component';
import { NavbarComponent } from '../navbar/navbar.component';
//import services
import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';

const routes: Routes = [
  { path: '', component: AddworkoutComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ AddworkoutComponent ],
  providers: [CategoryService, WorkoutService]
})
export class AddWorkoutModule { }