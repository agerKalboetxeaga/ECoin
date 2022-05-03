import { Component, OnInit } from '@angular/core';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit {
cryptoSymbol !: CryptoSymbol;
cryptocurrency !: Cryptoo[];

  constructor(private cryptoService : CryptoService) { }

  ngOnInit(): void {
    this.cryptoSymbol= this.cryptoService.crypto;

    this.cryptoService.getCrypto(this.cryptoSymbol.name)
    .pipe(
      tap((cryp : Cryptoo[]) => {this.cryptocurrency = cryp; console.log(this.cryptocurrency[this.cryptocurrency.length -1])})
    ).subscribe();
  }

}
