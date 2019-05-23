import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { ViewworkoutsComponent } from '../viewworkouts/viewworkouts.component';

const mainRoutes: Routes = [  
  { path: '', redirectTo: 'view', pathMatch: 'full'},
  {
    // since this is the default route, it must NOT be lazy loaded.
    path: 'view',
    component: ViewworkoutsComponent
  },
  {
    path: 'edit/:index',
    loadChildren: '../edit-workout/edit-workout.module#EditWorkoutModule'
  },
  {
    path: 'start/:index',    
    loadChildren: '../start-workout/start-workout.module#StartWorkoutModule'
  },
  {
    path: 'end/:index',    
    loadChildren: '../end-workout/end-workout.module#EndWorkoutModule'
  },
  {
    path: 'create',    
    loadChildren: '../add-workout/add-workout.module#AddWorkoutModule'
  },
  {
    path: 'category',    
    loadChildren: '../add-category/add-category.module#AddCategoryModule'
  },
  {
    path: 'track',    
    loadChildren: '../track-workouts/track-workouts.module#TrackWorkoutsModule'
  }
];

const routeConfig = {
  //useHash: true,
  preloadingStrategy: NoPreloading
};

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, routeConfig)],
  exports: [RouterModule]
})
export class mainrouting {
}