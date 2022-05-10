import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { FormsModule } from '@angular/forms';
import { NftTransactionsComponent } from './nft-transactions/nft-transactions.component';
import { CryptoTransactionsComponent } from './crypto-transactions/crypto-transactions.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    NftTransactionsComponent,
    CryptoTransactionsComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule
  ]
})
export class TransactionsModule { }
