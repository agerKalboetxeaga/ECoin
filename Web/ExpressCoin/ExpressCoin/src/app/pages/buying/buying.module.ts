import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingRoutingModule } from './buying-routing.module';
import { BuyingComponent } from './buying.component';
import { FormsModule } from '@angular/forms';
import { BuyingViewComponent } from './buying-view/buying-view.component';


@NgModule({
  declarations: [
    BuyingComponent,
    BuyingViewComponent
  ],
  imports: [
    CommonModule,
    BuyingRoutingModule,
    FormsModule

  ]
})
export class BuyingModule { }
