import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CryptoSymbolModel } from 'src/app/models/cryptoSymbol.model';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-add-crypto-form',
  templateUrl: './add-crypto-form.component.html',
  styleUrls: ['./add-crypto-form.component.css']
})
export class AddCryptoFormComponent implements OnInit {

  user !: User;

  constructor(private loginSvc : LoginService,
    private cryptoSvc : CryptoService,
    private router : Router) { }

  ngOnInit(): void {

    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((_user : User) => this.user = _user)
    ).subscribe();

  }


  addCryptoSymbol(){
    let _cryptoName = (<HTMLInputElement> document.getElementById("crypto_name")).value;
    let _cryptoSymbol = (<HTMLInputElement> document.getElementById("crypto_symbol")).value;

    if(_cryptoName !== "" && _cryptoSymbol!== "")
    if(Number(_cryptoName)!==NaN && Number(_cryptoSymbol)!==NaN){  //No es numero

      let newCryptoSymbol = new CryptoSymbolModel(_cryptoName, _cryptoSymbol);


      this.cryptoSvc.addCryptoSymbol(newCryptoSymbol).pipe(tap ((x:any)=> alert("crypto Component Added"))).subscribe();
      this.router.navigate(['/main']);
    }


    
  }

}
