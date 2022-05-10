import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyNFTComponent } from './buy-nft.component';

const routes: Routes = [{ path: '', component: BuyNFTComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyNFTRoutingModule { }
