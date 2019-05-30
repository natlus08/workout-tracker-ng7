import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Category } from '../model/category';

import { Constants } from '../constants/constants';

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient, private fireStore: AngularFirestore) { }

  getCategories():Observable<Category[]>{
    let categoriesCollection: AngularFirestoreCollection<Category> = this.fireStore.collection<Category>('categories');
    return categoriesCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        const data = item.payload.doc.data() as Category;
        const id = item.payload.doc.id;        
        return { id, ...data }; // .. refers destructuring       
      }))
    );   
  }

  addCategory(category:Category): Promise<DocumentReference>{    
    return this.fireStore.collection<Category>('categories').add({...category}); // ... is a spread operator
  }

  editCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.put<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  deleteCategory(id:number):Observable<any>{
    return this.http.delete(Constants.API_ENDPOINT+'category/'+id, Constants.HTTP_OPTIONS);
  }

}