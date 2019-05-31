import { Workout } from './workout';

export class ActiveWorkout {
  public id: string;
  public workout: Workout;
  public comment: string;
  public startDate: Date;
  public endDate: Date;
  public startTime: Date;
  public endTime: Date;
  public status: boolean;

  constructor(workout: Workout, comment: string, startDate: Date, endDate: Date, startTime: Date, endTime: Date, status: boolean, id?: string) { 
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