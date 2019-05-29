import { Workout } from './workout';

export class ActiveWorkout {
  constructor(id: number, workout: Workout, comment: string, startDate: Date, endDate: Date, startTime: Date, endTime: Date, status: boolean) {  }
  public id: number;
  public workout: Workout;
  public comment: string;
  public startDate: Date;
  public endDate: Date;
  public startTime: Date;
  public endTime: Date;
  public status: boolean;
}