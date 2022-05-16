import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { Logresponse } from 'src/app/models/logresponse.model';
import { UserMaker } from 'src/app/models/user.model';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variable declaration
  user !: User;
  user_light !: UserMaker;


  constructor(private loginService : LoginService,
    private router : Router) { }



  ngOnInit(): void {
  }

  /**
   * This is the login method and if the given email and password are correct
   * the API will response with a token that we will use as cookie
   * 
   * @param _user user who attemps to login
   */
  login (_user : UserMaker){
    this.loginService.login(_user)
    .subscribe(({data}) => {
      //  if login is succesful 
      console.log("token =>" + data.token)
      if(typeof data.token === 'string'){
        this.loginService.setToken(data.token);


      this.loginService.userEmail = _user.email;
      this.router.navigate(['/main']);
      }else{
        alert("invalid username or email");
      }
      

      
    });
    

  }
}
