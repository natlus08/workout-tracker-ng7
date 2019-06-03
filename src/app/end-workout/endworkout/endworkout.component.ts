import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { WorkoutService } from '../../services/workout.service';

import { Workout } from '../../model/workout';
import { ActiveWorkout } from '../../model/activeworkout';
import { Category } from '../../model/category';

@Component({
  selector: 'app-endworkout',
  templateUrl: './endworkout.component.html',
  styleUrls: ['./endworkout.component.css']
})
export class EndworkoutComponent implements OnInit {

  private selectedId: string;

  private activeWorkout: ActiveWorkout = null;

  private today:Date = new Date();

  private hours:number = 0;

  private minutes:number = 0;

  private seconds:number = 0;

  private year:number = 0;

  private month:number = 0;

  private date:number = 0;

  private erroneous: boolean = false;

  constructor(private _workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) {
    this.activeWorkout = new ActiveWorkout(new Workout('','',0,new Category(null,'')),'',null,null,null,null,false);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  params['index'];
    });
    this.getActiveWorkout();
  }

  getActiveWorkout() : void{
    this._workoutService.getActiveWorkout().subscribe((data) => {       
        let activeWorkouts: ActiveWorkout[] = data;       
        activeWorkouts.forEach(item => {
          this.activeWorkout = item;
          this.activeWorkout.endDate = this.today;
          this.activeWorkout.endTime = this.today;
          return;
        });                 
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the active workout');
    };
  }

  end() : void {
    let endDateTime = this.combineEndDateTime(this.activeWorkout);
    let startDateTime = this.combineStartDateTime(this.activeWorkout);
    if(endDateTime > new Date() || endDateTime < startDateTime){
      this.erroneous = true;
    }else{
      this.startDateFormat();
      this.startTimeFormat();
      this.activeWorkout.status = false;      
      this._workoutService.endWorkout(this.activeWorkout).then(() => {
        this.router.navigate(['/view']);
      }),
      (err: HttpErrorResponse) => {        
        console.log('Failed to end the workout');
      };
    }
  }

  startTimeFormat():void {    
    this.activeWorkout.startTime = new Date(1970, 0, 1, this.activeWorkout.startTime.toDate().getHours(), this.activeWorkout.startTime.toDate().getMinutes(), 
      this.activeWorkout.startTime.toDate().getSeconds());
  }

  startDateFormat():void {    
    this.activeWorkout.startDate = new Date(this.activeWorkout.startDate.toDate().getFullYear(),this.activeWorkout.startDate.toDate().getMonth(),
      this.activeWorkout.startDate.toDate().getDate(), 0, 0, 0);
  }

  timereintialize($event):void {
    this.hours = $event.substring(0, 2);
    this.minutes = $event.substring(3, 5);
    this.seconds = $event.substring(6, 8);
    this.activeWorkout.endTime = new Date(1970, 0, 1, this.hours, this.minutes, this.seconds);
  }

  datereintialize($event):void {
    this.year = $event.substring(0, 4);
    this.month = $event.substring(5, 7);
    this.date = $event.substring(8, 10);
    this.activeWorkout.endDate = new Date(this.year,this.month-1,this.date, 0, 0, 0);
  }

  combineEndDateTime(activeWorkout: ActiveWorkout) : Date {
    return new Date(activeWorkout.endDate.getFullYear(), activeWorkout.endDate.getMonth(), activeWorkout.endDate.getDate(),
      activeWorkout.endTime.getHours(), +activeWorkout.endTime.getMinutes(), +activeWorkout.endTime.getSeconds());
  }

  combineStartDateTime(activeWorkout: ActiveWorkout) : Date {   
    return new Date(activeWorkout.startDate.toDate().getFullYear(), activeWorkout.startDate.toDate().getMonth(), activeWorkout.startDate.toDate().getDate(),
      activeWorkout.startTime.toDate().getHours(), activeWorkout.startTime.toDate().getMinutes(), activeWorkout.startTime.toDate().getSeconds());
  }
}