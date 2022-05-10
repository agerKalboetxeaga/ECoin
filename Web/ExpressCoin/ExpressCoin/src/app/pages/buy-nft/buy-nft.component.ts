import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { NFT } from 'src/app/interfaces/nft.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-buy-nft',
  templateUrl: './buy-nft.component.html',
  styleUrls: ['./buy-nft.component.css']
})
export class BuyNFTComponent implements OnInit {
  nft !: NFT;
  user !: User;
  constructor(private cryptoSvc : CryptoService,
    private loginSvc : LoginService) { }

  ngOnInit(): void {

    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((_user : User) => this.user = _user)
    ).subscribe();

    this.cryptoSvc.getNFT(this.cryptoSvc.nftID).pipe(
      tap((_nft :NFT) => this.nft = _nft)
    ).subscribe();
  }

}
