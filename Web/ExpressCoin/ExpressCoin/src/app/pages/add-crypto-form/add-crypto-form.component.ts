import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { User } from 'src/app/interfaces/user.interface';
import { NFTModel } from 'src/app/models/nft.model';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-add-crypto-form',
  templateUrl: './add-crypto-form.component.html',
  styleUrls: ['./add-crypto-form.component.css']
})
export class AddCryptoFormComponent implements OnInit {

  cryptoSymbols !: CryptoSymbol[];
  selectedImg !:File;
  img : any;
  user !: User;


  constructor( private cryptoSvc : CryptoService,
    private router : Router, private loginSvc : LoginService ) { }

  ngOnInit(): void {

    this.cryptoSvc.getSymbols().pipe(
      tap((symbols : CryptoSymbol[]) => this.cryptoSymbols = symbols)
    ).subscribe(this.setItems);
    
    this.loginSvc.getUser(this.loginSvc.userEmail).pipe(
      tap((u : User) => this.user = u)
    ).subscribe();

    



  }
  setItems() : void {
    let symbols =(<HTMLSelectElement> document.getElementById("cypto_symbol"));

    this.cryptoSymbols.forEach(symbol => {
      
      let option = document.createElement('option');
      option.text = symbol.name;
      option.value = symbol.symbol;
      symbols.options.add(option);
    });

  }
  onFileSelected(event : any){

    this.selectedImg = event.target.files[0];

    let myReader : FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.img = myReader.result; //this.img se manda
    }

    console.log(this.img);
  }
  addNFT(){
    let _name = (<HTMLInputElement> document.getElementById("nft_name")).value;
    let _creator = (<HTMLInputElement> document.getElementById("nft_creator")).value;
    let _price = (<HTMLInputElement> document.getElementById("nft_price")).value;
    let select = (<HTMLSelectElement> document.getElementById("crypto_symbol"));
    let _cryptocurrency = select.options[select.selectedIndex].value;
    let _img = this.img;

    let nft = new NFTModel(null, _name, _creator, parseFloat(_price), _cryptocurrency, _img);

     
  }

}
