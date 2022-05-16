import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrenciesRoutingModule } from './cryptocurrencies-routing.module';
import { CryptocurrenciesComponent } from './cryptocurrencies.component';


@NgModule({
  declarations: [
    CryptocurrenciesComponent
  
  ],
  imports: [
    CommonModule,
    CryptocurrenciesRoutingModule
  ]
})
export class CryptocurrenciesModule { }
