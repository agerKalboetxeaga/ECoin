import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyNFTRoutingModule } from './buy-nft-routing.module';
import { BuyNFTComponent } from './buy-nft.component';


@NgModule({
  declarations: [
    BuyNFTComponent
  ],
  imports: [
    CommonModule,
    BuyNFTRoutingModule
  ]
})
export class BuyNFTModule { }
