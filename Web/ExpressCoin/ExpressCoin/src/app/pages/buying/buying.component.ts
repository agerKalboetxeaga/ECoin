import { Component, OnInit } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CryptoComponentComponent } from '../cryptocurrencies/crypto-component/crypto-component.component';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {
cryptoSymbol !: CryptoSymbol;
cryptocurrency !: Cryptoo[];
user !: User;
_cryptosymbol !: CryptoSymbol;
crypto !: Cryptoo;


  constructor(private cryptoService : CryptoService) { }

  ngOnInit(): void {
    this.cryptoSymbol= this.cryptoService.crypto;

    this.cryptoService.getCrypto(this.cryptoSymbol.name)
    .pipe(
      tap((cryp : Cryptoo[]) => {this.cryptocurrency = cryp; console.log(this.cryptocurrency[this.cryptocurrency.length -1])})
    ).subscribe();
    this.crypto = this.cryptocurrency[this.cryptocurrency.length -1];
    this._cryptosymbol = this.cryptoSymbol;

     
    
      
    
  }
  comprar(){
    let input : number = 5;

    this._cryptosymbol.quantity = input / this.crypto.price;
    this.user.cryptos?.push(this._cryptosymbol);
    //this.cryptoService.updateUser(this.user);

  }
}
