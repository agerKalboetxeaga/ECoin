import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCryptoFormRoutingModule } from './add-crypto-form-routing.module';
import { AddCryptoFormComponent } from './add-crypto-form.component';


@NgModule({
  declarations: [
    AddCryptoFormComponent
  ],
  imports: [
    CommonModule,
    AddCryptoFormRoutingModule
  ]
})
export class AddCryptoFormModule { }
