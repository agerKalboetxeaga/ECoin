import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptocurrenciesComponent } from './cryptocurrencies.component';

const routes: Routes = [{ path: '', component: CryptocurrenciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrenciesRoutingModule { }
