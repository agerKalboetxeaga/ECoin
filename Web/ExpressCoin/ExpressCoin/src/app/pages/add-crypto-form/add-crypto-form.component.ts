import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { User } from 'src/app/interfaces/user.interface';
import { NFTModel } from 'src/app/models/nft.model';
import { NftCreator } from 'src/app/models/nftCreator.model';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';


/*

    Ruta:
        http://localhost:4200/idoia-apruebanos-porfi

                      */

@Component({
  selector: 'app-add-crypto-form',
  templateUrl: './add-crypto-form.component.html',
  styleUrls: ['./add-crypto-form.component.css']
})
export class AddCryptoFormComponent implements OnInit {

  selectedImg !:File;
  img : any;
  user !: User;
  cryptoCurrency : any;
  select : any;


  constructor( private cryptoSvc : CryptoService,
    private router : Router, private loginSvc : LoginService ) { }

  ngOnInit(): void {

    this.cryptoSvc.getSymbols().pipe(
      tap((symbols : CryptoSymbol[]) => {
        this.setItems(symbols)
      } )
    ).subscribe();
    
    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((u : User) => this.user = u)
    ).subscribe();

    



  }
  setItems(_symbols : CryptoSymbol[]) : void {
    let symbols =(<HTMLSelectElement> document.getElementById("cypto_symbol"));

   _symbols.forEach(symbol => {
      
      let option = document.createElement('option');
      option.text = symbol.name;
      option.value = symbol.symbol;
      symbols.options.add(option);
      
    });
    this.cryptoCurrency = symbols.options;
    this.select = symbols;

  }
  onFileSelected(event : any){

    this.selectedImg = event.target.files[0];

    let myReader : FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.img = myReader.result; //this.img se manda
    }

 
  }
  addNFT(){
    let _name = (<HTMLInputElement> document.getElementById("nft_name")).value;
    let _creator = (<HTMLInputElement> document.getElementById("nft_creator")).value;
    let _price = (<HTMLInputElement> document.getElementById("nft_price")).value;
 
    //let _cryptocurrency = select.options[select.selectedIndex].value;
    let _img = this.img;
    console.log("crypt: " + this.select.selectedIndex);
    let nft = new NFTModel(Math.floor(Math.random() * 999999999999999).toString(), _name, _creator, parseFloat(_price), this.cryptoCurrency[this.select.selectedIndex].value, _img);
    this.user.nft?.push(nft);

    

    this.cryptoSvc.addNFT(this.user).subscribe();

    this.router.navigate(['/main']);

     
  }

}
