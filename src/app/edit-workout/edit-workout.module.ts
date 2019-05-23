import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { EditworkoutComponent } from './editworkout/editworkout.component';
import { NavbarComponent } from '../navbar/navbar.component';
//import services
import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';

const routes: Routes = [
  { path: '', component: EditworkoutComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ EditworkoutComponent ],
  providers: [CategoryService, WorkoutService]
})
export class EditWorkoutModule { }