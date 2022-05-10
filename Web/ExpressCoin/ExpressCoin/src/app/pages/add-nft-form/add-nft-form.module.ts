import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCryptoFormRoutingModule } from './add-nft-form-routing.module';
import { AddCryptoFormComponent } from './add-nft-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCryptoFormComponent
  ],
  imports: [
    CommonModule,
    AddCryptoFormRoutingModule,
    FormsModule
  ]
})
export class AddCryptoFormModule { }
