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

@Injectable({
    providedIn: 'root'
  })
export class CryptoService {
    apiURL = 'http://192.168.1.138:5000/';
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
    }