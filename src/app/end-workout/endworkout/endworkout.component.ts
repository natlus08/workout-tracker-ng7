import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WorkoutService } from '../../services/workout.service';

import { Workout } from '../../model/workout';
import { Archive } from '../../model/archive';

@Component({
  selector: 'app-endworkout',
  templateUrl: './endworkout.component.html',
  styleUrls: ['./endworkout.component.css']
})
export class EndworkoutComponent implements OnInit {

  private workout:Workout = null;

  private workouts:Workout[] = [];

  private selectedId: number;

  private archive: Archive = null;

  private archives:Archive[] = [];

  private today:Date = new Date();

  private startDate:Date = null;

  private endDate:Date = null;

  private hours:number = 0;

  private minutes:number = 0;

  private year:number = 0;

  private month:number = 0;

  private date:number = 0;

  constructor(private _workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) {
    this.workout = new Workout('','',0,'',null,null,null,null,false);
    this.archive = new Archive('','',0,null,null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  +params['index'];
    });
    this.getWorkouts();
    this.getArchives();
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
        this.workout = this.workouts[this.selectedId];
        this.workout.enddate = this.today;
        this.workout.endtime = this.today;
      }
    );
  }

  getArchives(): void{
    this._workoutService.getArchives().subscribe((data) => {
        if(data != null){
          this.archives = data;
        }else{
          this.archives = [];
        }
      }
    );
  }

  end() : void {
    this.archiveObject();
    this.workout.started = false;
    this.workout.startdate = null;
    this.workout.enddate = null;
    this.workout.starttime = null;
    this.workout.endtime = null;
    this.workouts[this.selectedId] = this.workout;
    this._workoutService.addWorkout(this.workouts).subscribe(() => {

    });
    this.archives.push(this.archive);
    this._workoutService.archive(this.archives).subscribe(() => {
      this.router.navigate(['/view']);
    });
  }

  archiveObject(): void{
    this.archive.title = this.workout.title;
    this.archive.note = this.workout.note;
    this.archive.startdate = new Date(this.workout.startdate.getFullYear(), this.workout.startdate.getMonth(), this.workout.startdate.getDate(),this.workout.starttime.getHours(), this.workout.starttime.getMinutes(),0);
    this.archive.enddate = new Date(this.workout.enddate.getFullYear(), this.workout.enddate.getMonth(), this.workout.enddate.getDate(),this.workout.endtime.getHours(), this.workout.endtime.getMinutes(),0);
    this.archive.calories = ((this.archive.enddate.getTime() -  this.archive.startdate.getTime())/(1000*60))*this.workout.calories;
  }

  timereintialize($event):void {
    this.hours = $event.substring(0, 2);
    this.minutes = $event.substring(3, 5);
    this.workout.endtime = new Date(1970, 0, 1, this.hours, this.minutes, 0);
  }

  datereintialize($event):void {
    this.year = $event.substring(0, 4);
    this.month = $event.substring(5, 7);
    this.date = $event.substring(8, 10);
    this.workout.enddate = new Date(this.year,this.month-1,this.date, 0, 0, 0);
  }
}