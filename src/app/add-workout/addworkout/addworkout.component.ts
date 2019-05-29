import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { WorkoutService } from '../../services/workout.service';

import { Category } from '../../model/category';
import { Workout } from '../../model/workout';

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
    this.workout = new Workout(null,'','',0,new Category(null,''));
  }

  ngOnInit() {
    this.getCategories();
    this.getWorkouts();
  }

  getCategories() : void{
    this._categoryService.getCategories().subscribe((data) => {
        if( data != null){
          this.categories = data;
          //default the catgeory to the first element
          this.workout.category = this.categories[0];
        }
      }
    );
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        if (data != null) {
          this.workouts = data;
        }
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
      this._workoutService.addWorkout(this.workout).subscribe(() => {
        this.router.navigate(['/view']);
      });
    }
  }

  increment() : void{
    this.workout.caloriesBurnt = this.workout.caloriesBurnt + 0.1;
  }

  decrement() : void{
    this.workout.caloriesBurnt = (this.workout.caloriesBurnt > 0.1) ? (this.workout.caloriesBurnt - 0.1) : this.workout.caloriesBurnt;
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
      if(category.name.toLowerCase() == this.newCategory.toLowerCase()){
        this.categoryFound = true;
        return;
      }
    });
    if(!this.categoryFound){
      let newCategoryObj: Category = new Category(null,this.newCategory);
      this._categoryService.addCategory(newCategoryObj).subscribe((data) => {
        this.newCategory = '';
        this.categories.push(data);
        this.categoryAdded = true;
      });
    }
  }
}