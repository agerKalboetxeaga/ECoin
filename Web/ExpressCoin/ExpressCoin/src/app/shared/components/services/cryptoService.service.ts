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
import { CryptoSymbolModel } from 'src/app/models/cryptoSymbol.model';
import { RunEXECommand } from 'src/app/models/runExecommand.model';
import { NFTUser } from 'src/app/models/createNFTandUser.model';
import { NFT } from 'src/app/interfaces/nft.interface';

@Injectable({
    providedIn: 'root'
  })
export class CryptoService {
    apiURL = 'http://192.168.6.151:5000/';
    crypto !: CryptoSymbol;
    nftID !: string;

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
        addNFT(_user : NFTUser):Observable<any>
        {
            const body = JSON.stringify(_user);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'setNFT';

            return this.client.post(URL, body, {'headers': headers});
        }
        addCryptoSymbol(_cryptoSymbol : CryptoSymbolModel): Observable<any>
        {
            const body = JSON.stringify(_cryptoSymbol);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'addcrypto';
            
            return this.client.post(URL, body, {'headers': headers});
        }
        startEXE(command : RunEXECommand): Observable<any>
        {
            const body = JSON.stringify(command);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'startprogram';

            return this.client.post(URL, body, {'headers': headers});
        }
        getNFT(nft_id : string):Observable<NFT>
        {
            let URL = this.apiURL + "getNFT/" + nft_id;
            return this.client.get<NFT>(URL);
        }
        getNFTs():Observable<NFT[]>
        {
            let URL = this.apiURL + "getNFTs";
            return this.client.get<NFT[]>(URL);
        }
        
        buyNFT(_data : NFTUser): Observable<any>
        {
            const body = JSON.stringify(_data);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'buyNFT';

            return this.client.post(URL, body, {'headers': headers});
        }
    }
