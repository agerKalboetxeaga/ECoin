import { Component, OnInit } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { tap } from 'rxjs';
import { BuyCrypto } from 'src/app/models/buyCrypto.model';
import { User } from 'src/app/interfaces/user.interface';
import { CryptoComponentComponent } from '../cryptocurrencies/crypto-component/crypto-component.component';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { LoginService } from 'src/app/shared/components/services/loginService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {
cryptoSymbol !: CryptoSymbol;
cryptocurrency !: Cryptoo[];
user !: User;

crypto !: Cryptoo;


  constructor(private cryptoService : CryptoService,
    private loginSvc : LoginService,
    private router : Router) { }

  ngOnInit(): void {
    this.cryptoSymbol= this.cryptoService.crypto;

    this.cryptoService.getCrypto(this.cryptoSymbol.name)
    .pipe(
      tap((cryp : Cryptoo[]) => {
        this.cryptocurrency = cryp;
        console.log(this.cryptocurrency[this.cryptocurrency.length -1]);
        this.crypto = this.cryptocurrency[this.cryptocurrency.length -1];})
    ).subscribe();
    
    

     this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
       tap((_user : User) => {this.user = _user;})
     ).subscribe();
    
      
    
  }
  comprar(_user :User, _cryptosymbol:CryptoSymbol){

    //tenemos que hacer la resta entre la crypto que ha comprau - el que tiene
    let previousUser : User;
    previousUser = _user;
    let input = parseFloat((<HTMLInputElement> document.getElementById("_moneyInput")).value);
    let resta : number = 0;
    let cryptosNames: string[] = [];
    let found:boolean=false;

    _cryptosymbol.quantity = input / this.crypto.price; //lo que puede comprar
   
    
    if (this.user.cryptos != null){

      
     this.user.cryptos?.forEach(crypto => {
        
        cryptosNames.push(crypto.name)
      });
      
      console.log( "names :" +cryptosNames);
      

      this.user.cryptos?.forEach(crypto => {
      if (crypto.name == _cryptosymbol.name && crypto !== null){

          found = true;
          // @ts-ignore: Object is possibly 'null'.
          if(crypto.quantity > _cryptosymbol.quantity){
            // @ts-ignore: Object is possibly 'null'.
            resta = crypto.quantity - _cryptosymbol.quantity;
          }else{
           // @ts-ignore: Object is possibly 'null'.
            resta = _cryptosymbol.quantity - crypto.quantity;
          }
         
        
        // @ts-ignore: Object is possibly 'null'.
        crypto.quantity = crypto.quantity + _cryptosymbol.quantity;
        
        console.log("resta = " +resta);

      }
    });
    }else{

      this.user.cryptos = [];
     
      resta = _cryptosymbol.quantity;
      this.user.cryptos.push(_cryptosymbol);
    }
     if(!found){
      this.user.cryptos?.push(_cryptosymbol);
      resta = _cryptosymbol.quantity;
      }

      
      let cryptoArray: CryptoSymbol[] = [];
      cryptoArray.push(_cryptosymbol);
   
      console.log("symbol:" + _cryptosymbol)
      let buyData = new BuyCrypto(this.loginSvc.getToken(), cryptoArray, resta, this.crypto.price);
      console.log(buyData)
      this.cryptoService.updateUser(buyData).subscribe();
      this.router.navigate(["/main"]);
    
    
    
   
    
  }
}
