import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AddcategoryComponent } from './addcategory/addcategory.component';
import { NavbarComponent } from '../navbar/navbar.component';
//import services
import { CategoryService } from '../services/category.service';


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
  declarations: [ AddcategoryComponent ],
  providers: [CategoryService]
})
export class AddCategoryModule { }