import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { NftTransactions } from 'src/app/interfaces/nftTransaction.interface';
import { CryptoTransactions } from 'src/app/interfaces/transactions.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  //  Variable declarations
  nftTransactions !: NftTransactions[];
  cryptoTransactions !: CryptoTransactions[];


  constructor(private cryptoSvc : CryptoService) { }

  ngOnInit(): void {
    //  Getting all stored nft transactions
    this.cryptoSvc.getNFTTransactions().pipe(
      tap ((_nftTransactions : NftTransactions[]) => {this.nftTransactions =(<NftTransactions[]> _nftTransactions);
      _nftTransactions.forEach(transaction => console.log(transaction))})
    ).subscribe();
    
    
    //  Getting all stored crypto transactions
    this.cryptoSvc.getCryptoTransactions().pipe(
      tap((_cryptoTransactions : CryptoTransactions[]) => this.cryptoTransactions = _cryptoTransactions)
    ).subscribe();

    
    
  }
  

}
