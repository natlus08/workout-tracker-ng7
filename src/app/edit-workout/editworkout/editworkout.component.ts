import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

import { WorkoutService } from '../../services/workout.service';
import { CategoryService } from '../../services/category.service';

import { Workout } from '../../model/workout';
import { Category } from '../../model/category';

@Component({
  selector: 'app-editworkout',
  templateUrl: './editworkout.component.html',
  styleUrls: ['./editworkout.component.css']
})
export class EditworkoutComponent implements OnInit {

  private workout:Workout = null;

  private workouts:Workout[] = [];

  private categories:Category[] = [];

  private selectedId: number;

  private workoutFound:boolean = false;

  private newCategory:string = '';

  private categoryFound:boolean = false;

  private categoryAdded:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private _workoutService: WorkoutService, private _categoryService: CategoryService, private modalService: NgbModal) {
    this.workout = new Workout(null,'','',0,new Category(null,''));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  +params['index'];
    });
    this.getCategories();
    this.getWorkouts();
    this.getWorkout();
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the workouts');
    };
  }

  getWorkout() : void{
    this._workoutService.getWorkout(this.selectedId).subscribe((data) => {
        this.workout = data;
        this.workout.category = this.categories[this.getIndex(this.workout.category.id)];
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the workout');
    };
  }

  getCategories() : void{
    this._categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the categories');
    };
  }

  update(): void{
    this.workouts.forEach((workout,index) => {
      if(workout.id != this.selectedId && (workout.title.toLowerCase() == this.workout.title.toLowerCase())){
        this.workoutFound = true;
        return;
      }
    });
    if(!this.workoutFound){
      this._workoutService.editWorkout(this.workout).subscribe(() => {
        this.router.navigate(['/view']);
      }),
      (err: HttpErrorResponse) => {        
        console.log('Failed to update the workout');
      };
    }
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
        this.categoryAdded = true;
        this.categories.push(data);
      }),
      (err: HttpErrorResponse) => {        
        console.log('Failed to add the category');
      };
    }
  }

  getIndex(id: number) : number {
    let pos:number = -1;
    this.categories.forEach(function(category, index){
      if(category.id === id){
        pos = index;
      }
    });
    return pos;
  }

}