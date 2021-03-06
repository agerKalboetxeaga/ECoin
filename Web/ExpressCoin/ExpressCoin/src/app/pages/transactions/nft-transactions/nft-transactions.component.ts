import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NftTransactions } from 'src/app/interfaces/nftTransaction.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';

@Component({
  selector: 'app-nft-transactions',
  templateUrl: './nft-transactions.component.html',
  styleUrls: ['./nft-transactions.component.css']
})
export class NftTransactionsComponent implements OnInit {

  @Input() nftTransaction !: NftTransactions;
  
  constructor(private cryptoSvc : CryptoService,
    private router : Router) { }

  ngOnInit(): void {
    console.log("nft:" + this.nftTransaction.buyer)
  }
  /**
   * Will "send" selected nft´s id and send to nft buying page
   */
  goBuyNFT(){
     // @ts-ignore: Object is possibly 'null'.
    this.cryptoSvc.nftID = this.nftTransaction.nft.id;

    this.router.navigate(['/buy-nfts']);
  }

}
