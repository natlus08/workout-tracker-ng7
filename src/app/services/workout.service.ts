import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';

import { Workout } from '../model/workout';
import { Archive } from '../model/archive';

@Injectable()
export class WorkoutService {

  constructor(protected localStorage: AsyncLocalStorage) { }

  getWorkouts():Observable<any[]>{
    return this.localStorage.getItem<Workout>('workouts');
  }

  addWorkout(categories:Workout[]):Observable<boolean>{
    return this.localStorage.setItem('workouts', categories);
  }

  getArchives():Observable<any[]>{
    return this.localStorage.getItem<Archive>('archives');
  }

  archive(archives:Archive[]):Observable<boolean>{
    return this.localStorage.setItem('archives', archives);
  }

}