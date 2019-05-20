import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';

import { Category } from '../model/category';

@Injectable()
export class CategoryService {

  constructor(protected localStorage: AsyncLocalStorage) { }

  getCategories():Observable<any[]>{
    return this.localStorage.getItem<Category>('categories');
  }

  addCategory(categories:Category[]):Observable<boolean>{
    return this.localStorage.setItem('categories', categories);
  }

}