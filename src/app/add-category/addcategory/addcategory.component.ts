import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CategoryService } from '../../services/category.service'

import { Category } from '../../model/category';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})

export class AddcategoryComponent implements OnInit {

  public categories: Category[] = [];

  public newCategory: string = '';

  public category: Category = null;

  public categoryFound: boolean = false;

  public editCategoryFound: boolean = false;

  public editCategoryTitle: string = '';

 constructor(private _categoryService: CategoryService, private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() : void{
    this._categoryService.getCategories().subscribe((data) => {
        if(data != null){
          this.categories = data;          
        }
      }
    ),
    (err: HttpErrorResponse) => {        
      console.log('Failed to get the categories');
    };
  }

  addCategory() : void{
    this.categoryFound = false;
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
        this.newCategory = '';
      }).catch(err => {        
        console.log('Failed to add the category');
      });
    }
  }

  editCategory(id:number) : void {
    this.renderer.addClass(this.element.nativeElement.querySelector('#edit_'+id),'d-none');
    this.renderer.removeClass(this.element.nativeElement.querySelector('#update_'+id),'d-none');
    this.renderer.removeAttribute(this.element.nativeElement.querySelector('#title_'+id),'readonly');
  }

  updateCategory(id:number) : void {
    this.editCategoryFound = false;
    this.editCategoryTitle = this.element.nativeElement.querySelector('#title_'+id).value;
    this.renderer.addClass(this.element.nativeElement.querySelector('#msg_'+id),'d-none');
    this.categories.forEach(category => {
      if(category.name.toLowerCase() == this.editCategoryTitle.toLowerCase()){
        this.renderer.removeClass(this.element.nativeElement.querySelector('#msg_'+id),'d-none');
        this.editCategoryFound = true;
        return;
      }
    });
    if(!this.editCategoryFound){
      let currentCategory: Category = this.getCategoryFromArray(id);
      currentCategory.name = this.editCategoryTitle;
      this._categoryService.editCategory(currentCategory).subscribe((data) => {
        this.newCategory = '';
        this.categories.splice(this.getIndex(id),1);
        this.categories.push(data);
      }),
      (err: HttpErrorResponse) => {        
        console.log('Failed to get the update the category');
      };
    }
  }

  removeCategory(id:number) : void{
    let currentCategory: Category = this.getCategoryFromArray(id);
    this._categoryService.deleteCategory(currentCategory.id).subscribe(() => {
      this.newCategory = '';
      this.categories.splice(this.getIndex(id),1);
    }),
    (err: HttpErrorResponse) => {        
      console.log('Failed to delete the category');
    };
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

  getCategoryFromArray(id: number) : Category{
    let categoryFromId: Category = null;
    this.categories.forEach(category => {
      if(category.id === id){
        categoryFromId = category;
      }
    });
    return categoryFromId;
  }

}