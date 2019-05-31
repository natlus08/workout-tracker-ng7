import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { ActiveWorkout } from '../model/activeworkout';
import { Workout } from '../model/workout';
import { Category } from '../model/category';

import { Constants } from '../constants/constants';

@Injectable()
export class WorkoutService {

  constructor(private http:HttpClient, private fireStore: AngularFirestore) { }

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

  getWorkout(id: string): Observable<any> {    
    return this.fireStore.collection('workouts').doc(id).valueChanges();    
  }  

  getWorkouts():Observable<Workout[]>{
    let workoutsCollection: AngularFirestoreCollection<Workout> = this.fireStore.collection<Workout>('workouts');
    return workoutsCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        let data = item.payload.doc.data() as Workout;
        data.id = item.payload.doc.id;        
        return data;      
      }))
    );   
  }  

  addWorkout(workout: Workout): Promise<DocumentReference>{ 
    const { id, ...workoutToPersist } = workout; // strip id from the workout model     
    return this.fireStore.collection('workouts').add({...workoutToPersist}); // ... is a spread operator
  }  

  editWorkout(workout: Workout): Promise<void>{
    const docId = workout.id;
    const { id, ...workoutToPersist } = workout; // strip id from the workout model  
    return this.fireStore.collection('workouts').doc(docId).set(workoutToPersist);
  }

  deleteWorkout(id: number):Observable<any>{
    return this.http.delete(Constants.API_ENDPOINT+'workout/' + id, Constants.HTTP_OPTIONS);
  }

}