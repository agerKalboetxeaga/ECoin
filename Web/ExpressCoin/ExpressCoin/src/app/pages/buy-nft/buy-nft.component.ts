import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { NFT } from 'src/app/interfaces/nft.interface';
import { User } from 'src/app/interfaces/user.interface';
import { NFTUser } from 'src/app/models/createNFTandUser.model';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-buy-nft',
  templateUrl: './buy-nft.component.html',
  styleUrls: ['./buy-nft.component.css']
})
export class BuyNFTComponent implements OnInit {
  //  Variable declaration
  nft !: NFT;
  user !: User;
  imagePath : any

  constructor(private cryptoSvc : CryptoService,
    private loginSvc : LoginService,
    private router : Router,
    private _sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    //Getting selected NFT from the API 
    this.cryptoSvc.getNFT(this.cryptoSvc.nftID).pipe(
      tap((_nft :NFT) => { 
        this.nft = _nft;
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.nft.img);
       
      })).subscribe();

      //  Getting logged user
    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((_user : User) => {this.user = _user;})
    ).subscribe();

  


  }
  /**
   * This method will make the NFT Buying logic
   */
  buyNFT():void{

    let has : boolean = false

    //Looking for User´s all cryptocurrencies

     // @ts-ignore: Object is possibly 'null'.
    this.user.cryptos.forEach(crypto => {
      console.log("crypto: " + crypto.name);
      if (crypto.symbol == this.nft.symbol){    //  If the user has nft´s required crypto
        // @ts-ignore: Object is possibly 'null'.
        if(this.nft.price < crypto.quantity){   //  Looking if the user has required cryptocurrency´s enough quantity
                 // @ts-ignore: Object is possibly 'null'.
          crypto.quantity = crypto.quantity - this.nft.price; 
          this.nft.price = this.nft.price + 20;
        }else{
          alert("no tienes suficientes"  + crypto.name);
        }
        
        
        has = true;
      }
    });
    //  If the user has correct cryptocurrency 
    if(has){
      this.user.nft?.push(this.nft);
      let sendData = new NFTUser(this.user, this.nft);

      //  Send buyng data to the API
      this.cryptoSvc.buyNFT(sendData).subscribe( x => {
        alert(`el nft ${this.nft.name} se ha comprado correctamente`);
        this.router.navigate(['/main']);
      })

    }else{
      alert("no tienes la crypto")
    }
  }

}
