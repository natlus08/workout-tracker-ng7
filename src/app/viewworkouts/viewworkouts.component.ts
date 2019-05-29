import { Component, OnInit } from '@angular/core';

import { WorkoutService } from './../services/workout.service'

import { Workout } from '../model/workout';

@Component({
  selector: 'app-viewworkouts',
  templateUrl: './viewworkouts.component.html',
  styleUrls: ['./viewworkouts.component.css']
})
export class ViewworkoutsComponent implements OnInit {

  private workouts:Workout[] = [];

  private workoutInProgress:boolean = false;

  private activeWorkoutId : number = 0;

  constructor(private _workoutService: WorkoutService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getWorkouts();
    },100);
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
    });
    this._workoutService.getActiveWorkout().subscribe((data) => {
      if(null != data){
        this.workoutInProgress = true;
        this.activeWorkoutId = data.workout.id;
      }
    });
  }

  removeWorkout(id:number): void {
    this._workoutService.deleteWorkout(id).subscribe(() => {
      this.workouts.splice(this.getIndex(id), 1);
    });
  }

  getIndex(id: number) : number {
    let pos:number = -1;
    this.workouts.forEach(function(workout, index){
      if(workout.id === id){
        pos = index;
      }
    });
    return pos;
  }

}