import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Category } from '../model/category';

import { Constants } from '../constants/constants';

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(Constants.API_ENDPOINT+'categories', Constants.HTTP_OPTIONS);
  }

  addCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.post<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  editCategory(category:Category):Observable<Category>{
    let body = JSON.stringify(category);
    return this.http.put<Category>(Constants.API_ENDPOINT+'category', category, Constants.HTTP_OPTIONS);
  }

  deleteCategory(id:number):Observable<any>{
    return this.http.delete(Constants.API_ENDPOINT+'category/'+id, Constants.HTTP_OPTIONS);
  }

}