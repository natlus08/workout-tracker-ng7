import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CategoryService } from '../services/category.service';
import { WorkoutService } from '../services/workout.service';

import { Category } from '../model/category';
import { Workout } from '../model/workout';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrls: ['./addworkout.component.css']
})
export class AddworkoutComponent implements OnInit {

  public categories:Category[] = [];

  public workout:Workout = null;

  private workouts:Workout[] = [];

  private workoutFound:boolean = false;

  private newCategory:string = '';

  private categoryFound:boolean = false;

  private categoryAdded:boolean = false;

  constructor(private _categoryService: CategoryService, private _workoutService: WorkoutService, private modalService: NgbModal, private router: Router) {
    this.workout = new Workout('','',0,'',null,null,null,null,false);
  }

  ngOnInit() {
    this.getCategories();
    this.getWorkouts();
  }

  getCategories() : void{
    this._categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      }
    );
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
      }
    );
  }

  addworkout() : void{
    this.workoutFound = false;
    this.workouts.forEach(workout => {
      if(workout.title.toLowerCase() == this.workout.title.toLowerCase()){
        this.workoutFound = true;
        return;
      }
    });
    if(!this.workoutFound){
      this.workouts.push(this.workout);
      this._workoutService.addWorkout(this.workouts).subscribe(() => {
        this.router.navigate(['/view']);
      });
    }
  }

  increment() : void{
    this.workout.calories = this.workout.calories + 0.1;
  }

  decrement() : void{
    this.workout.calories = (this.workout.calories > 0.1) ? (this.workout.calories - 0.1) : this.workout.calories;
  }

  openCategoryModal(content): void{
    this.categoryFound = false;
    this.categoryAdded = false;
    this.modalService.open(content);
  }

  addCategory() : void{
    this.categoryFound = false;
    this.categoryAdded = false;
    this.categories.forEach(category => {
      if(category.title.toLowerCase() == this.newCategory.toLowerCase()){
        this.categoryFound = true;
        return;
      }
    });
    if(!this.categoryFound){
      this.categories.push(new Category(this.newCategory));
      this._categoryService.addCategory(this.categories).subscribe(() => {
        this.newCategory = '';
        this.categoryAdded = true;
      });
    }
  }

}