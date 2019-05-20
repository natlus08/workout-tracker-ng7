import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewworkoutsComponent } from '../viewworkouts/viewworkouts.component';
import { AddworkoutComponent } from '../addworkout/addworkout.component';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { EditworkoutComponent } from '../editworkout/editworkout.component';
import { StartworkoutComponent } from '../startworkout/startworkout.component';
import { EndworkoutComponent } from '../endworkout/endworkout.component';
import { TrackComponent } from '../track/track.component';

const mainRoutes: Routes = [
  { path: 'view', component: ViewworkoutsComponent },
  { path: 'edit/:index', component: EditworkoutComponent },
  { path: 'start/:index', component: StartworkoutComponent },
  { path: 'end/:index', component: EndworkoutComponent },
  { path: 'create', component: AddworkoutComponent },
  { path: 'category', component: AddcategoryComponent },
  { path: 'track', component: TrackComponent },
  { path: '**', redirectTo: 'view'}
];

export const mainrouting: ModuleWithProviders = RouterModule.forRoot(mainRoutes);