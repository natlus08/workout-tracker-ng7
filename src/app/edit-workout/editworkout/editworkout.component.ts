import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    this.workout = new Workout('','',0,'',null,null,null,null,false);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId =  +params['index'];
    });
    this.getCategories();
    this.getWorkouts();
  }

  getWorkouts() : void{
    this._workoutService.getWorkouts().subscribe((data) => {
        this.workouts = data;
        this.workout = this.workouts[this.selectedId];
      }
    );
  }

  getCategories() : void{
    this._categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      }
    );
  }

  update(): void{
    this.workouts.forEach((workout,index) => {
      if(index != this.selectedId && (workout.title.toLowerCase() == this.workout.title.toLowerCase())){
        this.workoutFound = true;
        return;
      }
    });
    if(!this.workoutFound){
      this.workouts[this.selectedId] = this.workout;
      this._workoutService.addWorkout(this.workouts).subscribe(() => {
        this.router.navigate(['/view']);
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