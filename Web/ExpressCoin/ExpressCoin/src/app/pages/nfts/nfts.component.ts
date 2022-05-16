import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { NFT } from 'src/app/interfaces/nft.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css']
})
export class NftsComponent implements OnInit {
  nfts !: NFT[];


  constructor(private router : Router,
    private cryptoSvc : CryptoService) { }

  ngOnInit(): void {
    //  Getting all stored NFTs
    this.cryptoSvc.getNFTs().pipe(
      tap ((_nfts : NFT[]) => this.nfts = _nfts)
    ).subscribe();
  }
  /**
   * This method will take user selected nft and "send" it to nft buying component
   * @param _nft selected nft to buy
   */
  buyNFT(_nft : NFT){
     // @ts-ignore: Object is possibly 'null'.
    this.cryptoSvc.nftID= _nft.id;
    
    this.router.navigate(['/buy-nfts']);
  }

}
