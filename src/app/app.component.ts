import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router } from "@angular/router";

import { Category } from './model/category';
import { Workout } from './model/workout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private categories: Category[] = [];
  private workouts: Workout[] = [];  

  constructor(protected localStorage: AsyncLocalStorage, private router: Router) {  }

  ngOnInit() {
    this.categories = [{title: 'Aerobics'}, {title: 'Jogging'}, {title: 'Walking'}];
    this.localStorage.setItem('categories', this.categories).subscribe(() => {});

    this.workouts = [{title: 'Jogging', note:'slow', calories:2, category:'Jogging', startdate:null, enddate:null, starttime:null, endtime:null, started:false},
                      {title: 'Zumba', note:'at office', calories:5, category:'Aerobics', startdate:null, enddate:null, starttime:null, endtime:null, started:false},
                      {title: 'Walking', note:'at race course', calories:10, category:'Walking', startdate:null, enddate:null, starttime:null, endtime:null, started:false}];
    this.localStorage.setItem('workouts', this.workouts).subscribe(() => {});      
  }
  
}