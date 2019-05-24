import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

//import components
import { AddcategoryComponent } from './addcategory/addcategory.component';
//import services
import { CategoryService } from '../services/category.service';
//import filters
import { CategoryFilterPipe } from '../pipes/categoryfilter.pipe';

const routes: Routes = [
  { path: '', component: AddcategoryComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [ AddcategoryComponent, CategoryFilterPipe ],
  providers: [CategoryService]
})
export class AddCategoryModule { }