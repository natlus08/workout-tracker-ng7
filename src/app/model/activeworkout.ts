import { Workout } from './workout';

export class ActiveWorkout {
  public id: string;
  public workout: Workout;
  public comment: string;
  public startDate: any;
  public endDate: any;
  public startTime: any;
  public endTime: any;
  public status: boolean;

  constructor(workout: Workout, comment: string, startDate: any, endDate: any, startTime: any, endTime: any, status: boolean, id?: string) { 
    this.comment = comment;
    this.endDate = endDate;
    this.endTime = endTime;
    this.id = id;
    this.startDate = startDate;
    this.startTime = startTime;
    this.status = status;
    this.workout = workout;
  }  
}