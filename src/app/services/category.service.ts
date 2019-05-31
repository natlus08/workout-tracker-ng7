import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Category } from '../model/category';

@Injectable()
export class CategoryService {

  constructor(private fireStore: AngularFirestore) { }

  getCategories():Observable<Category[]>{
    let categoriesCollection: AngularFirestoreCollection<Category> = this.fireStore.collection<Category>('categories');
    return categoriesCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        let data = item.payload.doc.data() as Category;
        data.id = item.payload.doc.id;        
        return data;      
      }))
    );   
  }

  addCategory(category:Category): Promise<DocumentReference>{ 
    const { id, ...categoryToPersist } = category; // strip id from the cateogry model     
    return this.fireStore.collection('categories').add({...categoryToPersist}); // ... is a spread operator
  }

  editCategory(category:Category): Promise<void>{
    const docId = category.id;
    const { id, ...categoryToPersist } = category; // strip id from the cateogry model  
    return this.fireStore.collection('categories').doc(docId).set(categoryToPersist);
  }

  deleteCategory(id:string): Promise<void>{
    return this.fireStore.collection('categories').doc(id).delete();
  }

}