import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCryptoFormComponent } from './add-crypto-form.component';

const routes: Routes = [{ path: '', component: AddCryptoFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCryptoFormRoutingModule { }
