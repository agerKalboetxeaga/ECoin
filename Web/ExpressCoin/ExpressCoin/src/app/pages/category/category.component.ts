import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    cryptos !: CryptoSymbol[];
    crypto !: CryptoSymbol;


  constructor(private cryptoService: CryptoService,
              private router: Router) { }

  ngOnInit(): void {

    this.cryptoService.getSymbols()
    .pipe(
      tap((cryp : CryptoSymbol[]) => {this.cryptos = cryp; console.log(this.cryptos)})
    ).subscribe();

  }
  buyCrypto(crypto_symbol: CryptoSymbol){
    this.crypto = crypto_symbol;
    this.cryptoService.crypto = this.crypto;

    this.router.navigate(['/buycrypto'])
  }

}
