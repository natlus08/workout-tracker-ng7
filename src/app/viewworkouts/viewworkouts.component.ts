import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { WorkoutService } from './../services/workout.service'

import { Workout } from '../model/workout';
import { ActiveWorkout } from '../model/activeworkout';

@Component({
  selector: 'app-viewworkouts',
  templateUrl: './viewworkouts.component.html',
  styleUrls: ['./viewworkouts.component.css']
})
export class ViewworkoutsComponent implements OnInit {

  private workouts:Workout[] = [];

  private workoutInProgress:boolean = false;

  private activeWorkoutId: string;

  constructor(private _workoutService: WorkoutService, private router: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getWorkouts();
    },100);
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
    }),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the workouts');
    };

    this._workoutService.getActiveWorkout().subscribe((data) => {
      if(data.length){
        let activeWorkouts: ActiveWorkout = data;
        this.workoutInProgress = true;
        activeWorkouts.forEach(activeWorkout => {
          this.activeWorkoutId = data.workout.id;
          return;
        });
      }
    }),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the active workouts');
    };
  }

  removeWorkout(id: string): void {
    this._workoutService.deleteWorkout(id).then(() => {
      
    }).catch((err: HttpErrorResponse) => {        
      console.log('Failed to get the delete the workout');
    });
  }  

  getIndex(id: string) : number {
    let pos:number = -1;
    this.workouts.forEach(function(workout, index){
      if(workout.id === id){
        pos = index;
      }
    });
    return pos;
  }

  start(id: number) {    
    this.router.navigate(['/start/' + id]);
  }  

  end(id: number) {
    this.router.navigate(['/end/' + id]);
  } 

}