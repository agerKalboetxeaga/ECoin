import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardGuard } from './user-guard.guard';

const routes: Routes = [
    { path: 'login',
     loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
     }, 
    { path: 'register',
     loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
     },
    { path: 'about',
     loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) 
    }, 
    { path: 'category',
     loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) 
    }, 
    { path: 'contact',
     loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) 
    },
    { path: 'cryptocurrencies',
     loadChildren: () => import('./pages/cryptocurrencies/cryptocurrencies.module').then(m => m.CryptocurrenciesModule) 
    },
    { path: 'no-fungible-tokens',
     loadChildren: () => import('./pages/nfts/nfts.module').then(m => m.NftsModule) 
    }, 
    { path: 'main',
     loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
     },
    { path: '',
     redirectTo: 'main', pathMatch:'full'
    },
    { path: 'buycrypto',
     loadChildren: () => import('./pages/buying/buying.module').then(m => m.BuyingModule),
     canActivate : [UserGuardGuard] 
    },
    { path: 'idoia-apruebanos-porfi',
     loadChildren: () => import('./pages/add-nft-form/add-nft-form.module').then(m => m.AddCryptoFormModule),
     canActivate : [UserGuardGuard] 
    },
    { path: 'add-cryptos',
     loadChildren: () => import('./pages/add-crypto-form/add-crypto-form.module').then(m => m.AddCryptoFormModule),
     canActivate : [UserGuardGuard] 
    },
    { path: 'transactions',
     loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule) ,
    canActivate : [UserGuardGuard]
    },
    { path: 'buy-nfts',
     loadChildren: () => import('./pages/buy-nft/buy-nft.module').then(m => m.BuyNFTModule),
    canActivate : [UserGuardGuard]
    },
    { path: 'user-management', loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule) },
    { path: '**', redirectTo: '', pathMatch:'full'}  
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
