import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { ActiveWorkout } from '../model/activeworkout';
import { Workout } from '../model/workout';

import { Constants } from '../constants/constants';

@Injectable()
export class WorkoutService {

  constructor(private fireStore: AngularFirestore) { }

  getActiveWorkout():Observable<ActiveWorkout[]>{
    let activeWorkoutsCollection: AngularFirestoreCollection<ActiveWorkout> = this.fireStore.collection('active-workouts', ref => ref.where('status', '==', true));
    return activeWorkoutsCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        let data = item.payload.doc.data() as ActiveWorkout;
        data.id = item.payload.doc.id;        
        return data;      
      }))
    );
  }

  getActiveWorkouts(): Observable<ActiveWorkout[]>{
    let activeWorkoutsCollection: AngularFirestoreCollection<ActiveWorkout> = this.fireStore.collection('active-workouts', ref => ref.where('status', '==', false));
    return activeWorkoutsCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        let data = item.payload.doc.data() as ActiveWorkout;
        data.id = item.payload.doc.id;        
        return data;      
      }))
    );
  }  

  startWorkout(activeWorkout: ActiveWorkout): Promise<DocumentReference>{ 
    const { id, ...activeWorkoutToPersist } = activeWorkout; // strip id from the active workout model     
    return this.fireStore.collection('active-workouts').add({...activeWorkoutToPersist}); // ... is a spread operator
  }   

  endWorkout(activeWorkout: ActiveWorkout): Promise<void>{     
    const docId = activeWorkout.id;
    const { id, ...activeWorkoutToPersist } = activeWorkout; // strip id from the active workout model  
    return this.fireStore.collection('active-workouts').doc(docId).set(activeWorkoutToPersist);
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

  deleteWorkout(id: string): Promise<void>{
    return this.fireStore.collection('workouts').doc(id).delete();
  }

}