import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMaker } from 'src/app/models/user.model';
import { LoginService } from 'src/app/shared/components/services/loginService.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService : LoginService,
              private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * This method will take a user and add it into the database
   * @param _user New user for Register
   */
  register(_user : UserMaker){
    this.loginService.register(_user).subscribe(data => {
      this.router.navigate(['/main']);
      //alert("User registered");
      });
  }

}
