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

  private workout:Workout = new Workout('','',0,new Category(null,''));

  private workouts:Workout[] = [];

  private categories:Category[] = [];

  private selectedId: string;

  private workoutFound:boolean = false;

  private newCategory:string = '';

  private categoryFound:boolean = false;

  private categoryAdded:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private _workoutService: WorkoutService, private _categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  params['index'];
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
        this.workout = data as Workout;
        this.workout.id = this.selectedId; 
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
        if (this.workout.id){
          this.workout.category = this.categories[this.getIndex(this.workout.category.id)]; 
        }        
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
      this._workoutService.editWorkout(this.workout).then(() => {
        this.router.navigate(['/view']);
      }).catch((err: HttpErrorResponse) => {        
          console.log('Failed to update the workout');
      });
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
      let newCategoryObj: Category = new Category(this.newCategory);                 
      this._categoryService.addCategory(newCategoryObj).then(res => {
        newCategoryObj.id = res.id;  
        this.categoryAdded = true;      
        this.newCategory = '';
      }).catch(err => {        
        console.log('Failed to add the category');
      });
    }
  }

  getIndex(id: string) : number {
    let pos:number = -1;
    this.categories.forEach(function(category, index){
      if(category.id === id){
        pos = index;
      }
    });
    return pos;
  }

}