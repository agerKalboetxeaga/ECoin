import { Component, OnInit } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { tap } from 'rxjs';
import { BuyCrypto } from 'src/app/models/buyCrypto.model';
import { User } from 'src/app/interfaces/user.interface';
import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { LoginService } from 'src/app/shared/components/services/loginService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {
  //  Variable declarations
cryptoSymbol !: CryptoSymbol;
cryptocurrency !: Cryptoo[];
user !: User;

crypto !: Cryptoo;


  constructor(private cryptoService : CryptoService,
    private loginSvc : LoginService,
    private router : Router) { }

  ngOnInit(): void {
    // Getting selected cryptocurrency name
    this.cryptoSymbol= this.cryptoService.crypto;

    // Getting selected cryptocurrency`s stored values
    this.cryptoService.getCrypto(this.cryptoSymbol.name)
    .pipe(
      tap((cryp : Cryptoo[]) => {
        this.cryptocurrency = cryp;
        console.log(this.cryptocurrency[this.cryptocurrency.length -1]);
        this.crypto = this.cryptocurrency[this.cryptocurrency.length -1];})
    ).subscribe();
    
    
        // Getting logged User
     this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
       tap((_user : User) => {this.user = _user;})
     ).subscribe();
    
      
    
  }
  /**
   * This method will do the logic for the buying system
   * 
   * @param _user User who is using the page (logged client)
   * @param _cryptosymbol cryptocurrency to buy
   */
  comprar(_user :User, _cryptosymbol:CryptoSymbol){

    let previousUser : User;
    previousUser = _user;
    let input = parseFloat((<HTMLInputElement> document.getElementById("_moneyInput")).value);
    let resta : number = 0;
    let cryptosNames: string[] = [];
    let found:boolean=false;

    // How much cryptos can the user buy?
    _cryptosymbol.quantity = input / this.crypto.price;
   
    // if he already has any crypto
    if (this.user.cryptos != null){

      //add new one
     this.user.cryptos?.forEach(crypto => {
      
        cryptosNames.push(crypto.name)
      });
      
      console.log( "names :" +cryptosNames);
      
      //  Searching the crypto to buy in User`s owned cryptos  
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
    //He has no cryptos, so we have to create a new array with the new 
    //crypto he bought in it
    }else{

      this.user.cryptos = [];
     
      resta = _cryptosymbol.quantity;
      this.user.cryptos.push(_cryptosymbol);
    }
    //  If he already has cryptos but he doesnt have the selected crypto yet
     if(!found){
      this.user.cryptos?.push(_cryptosymbol);
      resta = _cryptosymbol.quantity;
      }

      
      let cryptoArray: CryptoSymbol[] = [];
      cryptoArray.push(_cryptosymbol);
   
      console.log("symbol:" + _cryptosymbol)
      let buyData = new BuyCrypto(this.loginSvc.getToken(), cryptoArray, resta, this.crypto.price);
      console.log(buyData);
      //  Send buying data to the API
      this.cryptoService.updateUser(buyData).subscribe(a=>{this.router.navigate(["/main"]);});
      
    
    
    
   
    
  }
}
