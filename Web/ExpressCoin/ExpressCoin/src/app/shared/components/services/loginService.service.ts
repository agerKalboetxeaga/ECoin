import { Component, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { UserMaker } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    apiURL = 'http://192.168.1.138:5000/';
    user !: User;

    constructor(private client : HttpClient, private cookies: CookieService){}

        login(_user:UserMaker):Observable<any>
        {
            const body = JSON.stringify(_user);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'login';

            return this.client.post(URL, body, {'headers': headers});
        }
        register(_user:UserMaker):Observable<any>
        {
            const body = JSON.stringify(_user);
            const headers = {'Content-type': 'application/json'};
            let URL = this.apiURL + 'register';

            return this.client.post(URL, body, {'headers': headers});
        }

        setToken(token : string) : void{
            this.cookies.set('token', token);

        }
        getToken() {
            return this.cookies.get("token");
        }
}
