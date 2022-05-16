import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NFT } from 'src/app/interfaces/nft.interface';

@Component({
  selector: 'app-nft-component',
  templateUrl: './nft-component.component.html',
  styleUrls: ['./nft-component.component.css']
})
export class NftComponentComponent implements OnInit {
  //Variable declarations
  @Input() nft !: NFT;
  @Output() comprarNFT = new EventEmitter<NFT>();
  imagePath : any;
  blob :any;

  constructor(private _sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    
  }
  

  onClick(): void
{
  //to lower case + send to parent component selected NFT
  this.nft.id?.toLocaleLowerCase();
  this.nft.creator.toLocaleLowerCase();
  this.nft.name.toLocaleLowerCase();
  this.nft.symbol.toLocaleLowerCase();
  this.comprarNFT.emit(this.nft);
}




}
