import { Component, OnInit } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { tap } from 'rxjs';
import { BuyCrypto } from 'src/app/models/buyCrypto.model';
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

    //tenemos que hacer la resta entre la crypto que ha comprau - el que tiene
    let previousUser : User;
    previousUser = this.user;
    let input : number = 5;
    let resta : number = 0;

    this._cryptosymbol.quantity = input / this.crypto.price; //lo que puede comprar
   
    if (this.user.cryptos !== null){

      this.user.cryptos?.forEach(crypto => {
      if (crypto.name == this._cryptosymbol.name && crypto !== null){
          // @ts-ignore: Object is possibly 'null'.
          if(crypto.quantity > this._cryptosymbol.quantity){
            // @ts-ignore: Object is possibly 'null'.
            resta = crypto.quantity - this._cryptosymbol.quantity;
          }else{
            // @ts-ignore: Object is possibly 'null'.
            resta = this._cryptosymbol - crypto.quantity;
          }
         
        
        // @ts-ignore: Object is possibly 'null'.
        crypto.quantity = crypto.quantity + this._cryptoSymbol.quantity;
        
        console.log(resta);
      }
    });
    }else{
      this.user.cryptos = [];

      // @ts-ignore: Object is possibly 'null'.
      resta = this._cryptoSymbol.quantity;
      this.user.cryptos.push(this._cryptosymbol);
    }
    


    let buyData = new BuyCrypto(this.user, resta);
    this.cryptoService.updateUser(this.user);

  }
}
