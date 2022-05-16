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

  //  Variable declarations
    cryptos !: CryptoSymbol[];
    crypto !: CryptoSymbol;


  constructor(private cryptoService: CryptoService,
              private router: Router) { }

  ngOnInit(): void {
    //  Getting all cryptos stored on the database
    this.cryptoService.getSymbols()
    .pipe(
      tap((cryp : CryptoSymbol[]) => {this.cryptos = cryp; console.log(this.cryptos)})
    ).subscribe();

  }
  /**
   *  This method will "send" the selected component to buying view (to buy the selected crypto)
   * @param crypto_symbol the selected cryptoSymbol 
   */
  buyCrypto(crypto_symbol: CryptoSymbol){
    this.crypto = crypto_symbol;
    this.cryptoService.crypto = this.crypto;

    this.router.navigate(['/buycrypto'])
  }

}
