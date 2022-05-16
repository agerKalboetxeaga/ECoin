import { Component, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { UserMaker } from 'src/app/models/user.model';
import { Logresponse } from 'src/app/models/logresponse.model';
import { LogResponseI } from 'src/app/interfaces/logresponse.interface';
/**
 * This service will take care of any user related API calls such as 
 * logins and registers..
 */
@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    apiURL = 'http://localhost:5000/';
    user !: User;
    userEmail : any;

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

        getUser(_username:string): Observable<User>
        {
            let URL = this.apiURL + 'getUser/'+_username;
            return this.client.get<User>(URL);
        }

        /**
         * This method will take a string and using the cookieService 
         * will set it as a cookie
         * @param token API login response to set as cookie
         */
        setToken(token : string) : void{
            this.cookies.set('token', token);

        }
        getToken() {
            
            return this.cookies.get("token");

        }
}
