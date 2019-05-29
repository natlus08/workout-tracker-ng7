import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActiveWorkout } from '../model/activeworkout';
import { Workout } from '../model/workout';

import { Constants } from '../constants/constants';

@Injectable()
export class WorkoutService {

  constructor(private http:HttpClient) { }

  getActiveWorkout():Observable<ActiveWorkout>{
    return this.http.get<ActiveWorkout>(Constants.API_ENDPOINT+'active-workout', Constants.HTTP_OPTIONS);
  }

  getActiveWorkouts():Observable<ActiveWorkout[]>{
    return this.http.get<ActiveWorkout[]>(Constants.API_ENDPOINT+'active-workouts', Constants.HTTP_OPTIONS);
  }

  startWorkout(activeWorkout:ActiveWorkout):Observable<ActiveWorkout>{
    let body = JSON.stringify(activeWorkout);
    return this.http.post<ActiveWorkout>(Constants.API_ENDPOINT+'active-workout/start', activeWorkout, Constants.HTTP_OPTIONS);
  }

  endWorkout(activeWorkout:ActiveWorkout):Observable<ActiveWorkout>{
    let body = JSON.stringify(activeWorkout);
    return this.http.post<ActiveWorkout>(Constants.API_ENDPOINT+'active-workout/end', activeWorkout, Constants.HTTP_OPTIONS);
  }

  getWorkout(id:number):Observable<Workout>{
    return this.http.get<Workout>(Constants.API_ENDPOINT+'workout/'+id, Constants.HTTP_OPTIONS);
  }

  getWorkouts():Observable<Workout[]>{
    return this.http.get<Workout[]>(Constants.API_ENDPOINT+'workouts', Constants.HTTP_OPTIONS);
  }

  addWorkout(workout: Workout):Observable<Workout>{
    return this.http.post<Workout>(Constants.API_ENDPOINT+'workout',workout, Constants.HTTP_OPTIONS);
  }

  editWorkout(workout: Workout):Observable<Workout>{
    return this.http.put<Workout>(Constants.API_ENDPOINT+'workout',workout, Constants.HTTP_OPTIONS);
  }

  deleteWorkout(id: number):Observable<any>{
    return this.http.delete(Constants.API_ENDPOINT+'workout/' + id, Constants.HTTP_OPTIONS);
  }

}