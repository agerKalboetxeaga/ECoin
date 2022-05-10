import { Component, Input, OnInit } from '@angular/core';
import { CryptoTransactions } from 'src/app/interfaces/transactions.interface';

@Component({
  selector: 'app-crypto-transactions',
  templateUrl: './crypto-transactions.component.html',
  styleUrls: ['./crypto-transactions.component.css']
})
export class CryptoTransactionsComponent implements OnInit {

  @Input() cryptoTransaction !: CryptoTransactions;

  constructor() { }

  ngOnInit(): void {
    console.log("buyer : " + this.cryptoTransaction.user)
  }

}
