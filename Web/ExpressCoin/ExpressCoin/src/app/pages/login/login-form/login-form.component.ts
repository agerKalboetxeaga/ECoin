import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserMaker } from 'src/app/models/user.model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [
    './login-form.component.css',
   '../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
   '../../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
   '../../../../assets/fonts/iconic/css/material-design-iconic-font.min.css',
   '../../../../assets/vendor/animate/animate.css',
   '../../../../assets/vendor/css-hamburgers/hamburgers.min.css',
   '../../../../assets/vendor/animsition/css/animsition.min.css',
   '../../../../assets/vendor/select2/select2.min.css',
   '../../../../assets/vendor/daterangepicker/daterangepicker.css',
  ]
})
export class LoginFormComponent implements OnInit {

  email !: string;
  pass !: string;

  @Output() logUser = new EventEmitter<UserMaker>();


  constructor() { }

  ngOnInit(): void {
  }
  onClick(): void{
    
    let user : UserMaker;
    this.hashPass(this.pass).then(hp => user = new UserMaker(this.email, hp, null, null, null, null, null)).then(u => this.logUser.emit(user));

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
