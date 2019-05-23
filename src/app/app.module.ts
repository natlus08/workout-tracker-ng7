import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
//import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewworkoutsComponent } from './viewworkouts/viewworkouts.component';
import { mainrouting } from './router/main-routing';
//import services
import { CategoryService } from './services/category.service';
import { WorkoutService } from './services/workout.service';
//import pipes
import { CategoryFilterPipe } from './pipes/categoryfilter.pipe';
import { WorkoutFilterPipe } from './pipes/workoutfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,    
    ViewworkoutsComponent,    
    CategoryFilterPipe,
    WorkoutFilterPipe    
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    mainrouting,
    AsyncLocalStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [CategoryService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
