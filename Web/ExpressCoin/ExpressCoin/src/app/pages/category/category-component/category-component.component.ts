import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.css']
})
export class CategoryComponentComponent implements OnInit {
  @Input() cryptoSymbol !: CryptoSymbol;
  @Output() comprarCrypto = new EventEmitter<CryptoSymbol>();

  constructor() { }

  ngOnInit(): void {
  }


  onClick(): void{
    this.comprarCrypto.emit(this.cryptoSymbol);
  }
}