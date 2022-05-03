import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingRoutingModule } from './buying-routing.module';
import { BuyingComponent } from './buying.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuyingComponent
  ],
  imports: [
    CommonModule,
    BuyingRoutingModule,
    FormsModule
  ]
})
export class BuyingModule { }
