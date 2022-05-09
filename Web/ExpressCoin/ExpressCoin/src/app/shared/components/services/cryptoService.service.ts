import { Component, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { UserMaker } from 'src/app/models/user.model';
import { Logresponse } from 'src/app/models/logresponse.model';
import { LogResponseI } from 'src/app/interfaces/logresponse.interface';
import { CryptoSymbol } from 'src/app/interfaces/Crypto.interface';
import { Cryptoo } from 'src/app/interfaces/cryptocurrency.interface';
import { BuyCrypto } from 'src/app/models/buyCrypto.model';
import { CryptoTransactions } from 'src/app/interfaces/transactions.interface';
import { NftTransactions } from 'src/app/interfaces/nftTransaction.interface';

@Injectable({
    providedIn: 'root'
  })
export class CryptoService {
    apiURL = 'http://localhost:5000/';
    crypto !: CryptoSymbol;

    constructor(private client : HttpClient, private cookies: CookieService){}

        getSymbols():Observable<CryptoSymbol[]>
        {
            
            let URL = this.apiURL + 'getcryptosymbol';

            return this.client.get<CryptoSymbol[]>(URL);
        }
        getCrypto(_name: string): Observable<Cryptoo[]>{
            let URL = this.apiURL + 'crypto/'+ _name;
            return this.client.get<Cryptoo[]>(URL);
        }
        getSymbol(_symbol : string): Observable<CryptoSymbol>{
            let  URL = this.apiURL + 'getSymbol/' + _symbol;
            return this.client.get<CryptoSymbol>(URL);
        }
        getCryptoTransactions():Observable<CryptoTransactions[]>
        {
            let URL = this.apiURL + 'getCryptoTransactions';
            return this.client.get<CryptoTransactions[]>(URL)
        }

        getNFTTransactions():Observable<NftTransactions[]>
        {
            let URL = this.apiURL + 'getNFTTransactions';
            return this.client.get<NftTransactions[]>(URL);
        }

        updateUser(_user: BuyCrypto): Observable<any>
        {
            const body = JSON.stringify(_user);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'setUser';

            return this.client.post(URL, body, {'headers': headers});

        }
        addNFT(_user : User):Observable<any>
        {
            const body = JSON.stringify(_user);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'setNFT';

            return this.client.post(URL, body, {'headers': headers});
        }
    }
