import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NFT } from 'src/app/interfaces/nft.interface';

@Component({
  selector: 'app-nft-component',
  templateUrl: './nft-component.component.html',
  styleUrls: ['./nft-component.component.css']
})
export class NftComponentComponent implements OnInit {
  @Input() nft !: NFT;
  @Output() comprarNFT = new EventEmitter<NFT>();
  imagePath : any;

  constructor(private _sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.nft.img);
  }
  onClick(): void
{
  this.comprarNFT.emit(this.nft);
}
}
