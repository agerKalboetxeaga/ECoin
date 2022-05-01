import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrenciesRoutingModule } from './cryptocurrencies-routing.module';
import { CryptocurrenciesComponent } from './cryptocurrencies.component';
import { CryptoComponentComponent } from './crypto-component/crypto-component.component';


@NgModule({
  declarations: [
    CryptocurrenciesComponent,
    CryptoComponentComponent
  ],
  imports: [
    CommonModule,
    CryptocurrenciesRoutingModule
  ]
})
export class CryptocurrenciesModule { }
