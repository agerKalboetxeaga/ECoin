import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryComponentComponent } from './category-component/category-component.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryComponentComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule
  ]
})
export class CategoryModule { }
