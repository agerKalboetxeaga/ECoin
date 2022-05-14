import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { CryptoService } from 'src/app/shared/components/services/cryptoService.service';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user !: User;
  constructor(private cookieSvc : CookieService, 
    private loginSvc : LoginService,
    private cyptoSvc : CryptoService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginSvc.getUser(this.loginSvc.getToken()).pipe(
      tap((_user : User) => this.user = _user)
    ).subscribe();
  }

  logOut(){
    this.cookieSvc.delete("token");
    window.location.reload();

  }
  changePassword(){

    let _newPass = (<HTMLInputElement> document.getElementById("_newPass")).value;
    
  
    this.hashPass(_newPass).then(hp => 
      {
        this.user.pass= hp;
        this.cyptoSvc.changePass(this.user).subscribe(a => {window.location.reload();});
        
      });


  }
   // this method will convert from plain text to sha-256 hash hex-string
   async hashPass(_pass : string){
    //encode as UTF-8
    const msgBuffer = new TextEncoder().encode(_pass);

    //hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    //convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    //convert bytes to hex string
    const hashHex : string = hashArray.map(p => p.toString(16).padStart(2, '0')).join('');

    return hashHex ;
  }
}
