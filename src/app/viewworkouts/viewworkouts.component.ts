import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { WorkoutService } from '../services/workout.service';
import { Workout } from '../model/workout';

@Component({
  selector: 'app-viewworkouts',
  templateUrl: './viewworkouts.component.html',
  styleUrls: ['./viewworkouts.component.css']
})
export class ViewworkoutsComponent implements OnInit {

  private workout:Workout = null;

  private workouts:Workout[] = [];

  private workoutInProgress:boolean = false;

  constructor(private _workoutService: WorkoutService,  private router: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getWorkouts();
    },100);
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
        this.workouts.forEach(workout => {
            if(workout.started){
              this.workoutInProgress = true;
              return;
            }
        });
    });
  }

  removeWorkout(index:number): void {
    this.workouts.splice(index, 1);
    this._workoutService.addWorkout(this.workouts).subscribe(() => {

    });
  }

  start(id: number) {    
    this.router.navigate(['/start/' + id]);
  }  

  end(id: number) {
    this.router.navigate(['/end/' + id]);
  }  
}