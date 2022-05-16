import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { User } from 'src/app/interfaces/user.interface';
import { NFTModel } from 'src/app/models/nft.model';
import { NftCreator } from 'src/app/models/nftCreator.model';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

import { DomSanitizer } from '@angular/platform-browser';
import { NFTUser } from 'src/app/models/createNFTandUser.model';


@Component({
  selector: 'app-add-nft-form',
  templateUrl: './add-nft-form.component.html',
  styleUrls: ['./add-nft-form.component.css']
})
export class AddCryptoFormComponent implements OnInit {

  //  Var declarations
  selectedImg !:File;
  img : string="3";
  user !: User;
  cryptoCurrency : any;
  select : any;
  imagePath !: any;


  constructor( private cryptoSvc : CryptoService,
    private router : Router, private loginSvc : LoginService,
    private _sanitizer : DomSanitizer ) { }

  ngOnInit(): void {

    // Getting current cryptos
    this.cryptoSvc.getSymbols().pipe(
      tap((symbols : CryptoSymbol[]) => {
        this.setItems(symbols)
      } )
    ).subscribe();
    
    // Getting logged user
    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((u : User) => this.user = u)
    ).subscribe();

    
  }
  /**
   * This method will generate the options for the select
   * 
   * @param _symbols array of Cryptos [bitcoin,ethereum,[...]] to be shown
   * in the select
   */
  setItems(_symbols : CryptoSymbol[]) : void {
    let symbols =(<HTMLSelectElement> document.getElementById("cypto_symbol"));

    //  Iterating each crypto to add to the Section element
   _symbols.forEach(symbol => {
      
      let option = document.createElement('option');
      option.text = symbol.name;
      option.value = symbol.symbol;
      symbols.options.add(option);
      
    });
    this.cryptoCurrency = symbols.options;
    this.select = symbols;

  }
  /**
   * This method will listen to adding a file event
   * 
   * @param event (When file selected)
   */
  onFileSelected(event : any){

    //  Getting selected image
    this.selectedImg = event.target.files[0];

    let myReader = new FileReader();

    myReader.readAsDataURL(this.selectedImg);
    
    //  Converting image into Base64 Blob
    myReader.onloadend = () => {
      
     // @ts-ignore: Object is possibly 'null'.
     var b64 : string = myReader.result.replace(/^data:.+;base64,/, '');
      
    // console.log(b64);

    //  Converting Blob into string
     this.img = myReader.result as string;

    };

   
    }

 
  /**
   * This method will get values from the form and
   * it will create a new nft in the database
   */
  addNFT(){
    //  Getting values
    let _name = (<HTMLInputElement> document.getElementById("nft_name")).value;
    let _creator = (<HTMLInputElement> document.getElementById("nft_creator")).value;
    let _price = (<HTMLInputElement> document.getElementById("nft_price")).value;
 
    let _img = this.img;

    //to read the base64 img
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    + this.img);



    // Creating a new nft with random generated ID
    console.log("crypt: " + this.select.selectedIndex);
    let nft = new NFTModel(Math.floor(Math.random() * 999999999999999).toString(), _name, _creator, parseFloat(_price), this.cryptoCurrency[this.select.selectedIndex].value, _img);
    this.user.nft?.push(nft);

    
    let nftUser = new NFTUser(this.user, nft);

    // Sending new NFT to the API in POST Call
    this.cryptoSvc.addNFT(nftUser).subscribe();

    this.router.navigate(['/main']);

     
  }

}
