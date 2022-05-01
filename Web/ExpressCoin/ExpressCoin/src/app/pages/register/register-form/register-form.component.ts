import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserMaker } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: [
    './register-form.component.css',
    '../../../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../assets/fonts/iconic/css/material-design-iconic-font.min.css',
    '../../../../assets/vendor/animate/animate.css',
    '../../../../assets/vendor/css-hamburgers/hamburgers.min.css',
    '../../../../assets/vendor/animsition/css/animsition.min.css',
    '../../../../assets/vendor/select2/select2.min.css',
    '../../../../assets/vendor/daterangepicker/daterangepicker.css'

  ]
})
export class RegisterFormComponent implements OnInit {
  email !: string;
  user !: string;
  name !: string;
  role !: string;
  pass !: string;
  confirmPass !: string;

@Output() registerUser = new EventEmitter<UserMaker>();


  constructor(private router : Router) { }

  ngOnInit(): void {
  }



  register(): void{
    console.log(this.pass)
    if(this.pass != "" && this.email != "" && this.name != "" && this.confirmPass != "" && this.user != ""){
      if (this.pass === this.confirmPass){
  
        let user : UserMaker;
        this.role="user";
        console.log(this.pass, this.email, this.name, this.confirmPass, this.role, this.user);
        this.hashPass(this.pass).then(hp =>  user = new UserMaker(this.email, hp, this.user, this.name ,this.role, null, null )).then(u => this.registerUser.emit(user)); //

      }else {
        alert("Tienen que coincidir las 2 contraseñas");
      }
      }else{
        alert("Tienes que rellenar todos los campos");
      }
    }


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
