import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserMaker } from 'src/app/models/user.model';
import { LoginService } from 'src/app/shared/components/services/loginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user !: User;
  user_light !: UserMaker;


  constructor(private loginService : LoginService,
    private router : Router) { }



  ngOnInit(): void {
  }


  login (_user : UserMaker){
    this.loginService.login(_user).subscribe(data => {
      this.loginService.setToken(data.token);

      this.router.navigate(['/main']);
    });
    this.loginService.login(_user)
    .subscribe(({data}) =>{
      this.loginService.setToken(data.token);

    });

  }
}
