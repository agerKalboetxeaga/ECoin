import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NftsRoutingModule } from './nfts-routing.module';
import { NftsComponent } from './nfts.component';
import { NftComponentComponent } from './nft-component/nft-component.component';


@NgModule({
  declarations: [
    NftsComponent,
    NftComponentComponent
  ],
  imports: [
    CommonModule,
    NftsRoutingModule
  ]
})
export class NftsModule { }
