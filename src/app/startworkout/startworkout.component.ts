import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkoutService } from '../services/workout.service';

import { Workout } from '../model/workout';

@Component({
  selector: 'app-startworkout',
  templateUrl: './startworkout.component.html',
  styleUrls: ['./startworkout.component.css']
})
export class StartworkoutComponent implements OnInit {

  private workout:Workout = null;

  private workouts:Workout[] = [];

  private selectedId: number;

  private hours:number = 0;

  private minutes:number = 0;

  private year:number = 0;

  private month:number = 0;

  private date:number = 0;

  private today:Date = new Date();

  constructor(private _workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) {
    this.workout = new Workout('','',0,'',null,null,null,null,false);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  +params['index'];
    });
    this.getWorkouts();
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
        this.workout = this.workouts[this.selectedId];
        this.workout.startdate = this.today;
        this.workout.starttime = this.today;
      }
    );
  }

  start() : void {
    this.workout.started = true;
    this.workouts[this.selectedId] = this.workout;
    this._workoutService.addWorkout(this.workouts).subscribe(() => {
      this.router.navigate(['/view']);
    });
  }

  cancel() : void{
    this.router.navigate(['/view']);
  }

  timereintialize($event):void {
    this.hours = $event.substring(0, 2);
    this.minutes = $event.substring(3, 5);
    this.workout.starttime = new Date(1970, 0, 1, this.hours, this.minutes, 0);
  }

  datereintialize($event):void {
    this.year = $event.substring(0, 4);
    this.month = $event.substring(5, 7);
    this.date = $event.substring(8, 10);
    this.workout.startdate = new Date(this.year,this.month-1,this.date, 0, 0, 0);
  }
}