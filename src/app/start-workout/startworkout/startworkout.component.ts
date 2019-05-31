import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { WorkoutService } from '../../services/workout.service';

import { ActiveWorkout } from '../../model/activeworkout';
import { Workout } from '../../model/workout';
import { Category } from '../../model/category'

@Component({
  selector: 'app-startworkout',
  templateUrl: './startworkout.component.html',
  styleUrls: ['./startworkout.component.css']
})
export class StartworkoutComponent implements OnInit {

  private activeWorkout:ActiveWorkout = null;

  private selectedId: string;

  private hours:number = 0;

  private minutes:number = 0;

  private seconds:number = 0;

  private year:number = 0;

  private month:number = 0;

  private date:number = 0;

  private today:Date = new Date();

  private erroneous: boolean = false;

  constructor(private _workoutService: WorkoutService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) {
    this.activeWorkout =  new ActiveWorkout(new Workout('','',0,new Category(null,'')),'',null,null,null,null,false);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  params['index'];
    });
    this.prepWorkout();
  }

  prepWorkout() : void{
    this._workoutService.getWorkout(this.selectedId).subscribe((data) => {      
        this.activeWorkout.workout = data as Workout;
        this.activeWorkout.workout.id = this.selectedId;
        this.activeWorkout.startDate = this.today; 
        this.activeWorkout.startTime = this.today;               
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the workout');
    };;
  }

  start() : void {
    let startDateTime = this.combineStartDateTime(this.activeWorkout);
    if(startDateTime > new Date()){
      this.erroneous = true;
    } else {
      this.activeWorkout.status = true;
      this._workoutService.startWorkout(this.activeWorkout).then(res => {
        this.router.navigate(['/view']);
      }).catch(err => {        
        console.log('Failed to start the workout');
      });
    }
  }

  combineStartDateTime(activeWorkout: ActiveWorkout) : Date {
    return new Date(activeWorkout.startDate.getFullYear(), activeWorkout.startDate.getMonth(), activeWorkout.startDate.getDate(),
      activeWorkout.startTime.getHours(), +activeWorkout.startTime.getMinutes(), +activeWorkout.startTime.getSeconds());
  }

  cancel() : void{
    this.router.navigate(['/view']);
  }

  timereintialize($event):void {
    this.hours = $event.substring(0, 2);
    this.minutes = $event.substring(3, 5);
    this.seconds = $event.substring(6, 8);
    this.activeWorkout.startTime = new Date(1970, 0, 1, this.hours, this.minutes, this.seconds);
  }

  datereintialize($event):void {
    this.year = $event.substring(0, 4);
    this.month = $event.substring(5, 7);
    this.date = $event.substring(8, 10);
    this.activeWorkout.startDate = new Date(this.year,this.month-1,this.date, 0, 0, 0);
  }
}