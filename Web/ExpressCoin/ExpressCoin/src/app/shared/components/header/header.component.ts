import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RunEXECommand } from 'src/app/models/runExecommand.model';
import { CryptoService } from '../services/cryptoService.service';
import { LoginService } from '../services/loginService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  command : RunEXECommand = new RunEXECommand("");
  constructor(private cryptoSvc : CryptoService,
    private loginSvc: LoginService,
    private cookieSvc : CookieService) { }

  ngOnInit(): void {
  
    let _register = (<HTMLElement> document.getElementById("_registrar"));
    let _login = (<HTMLAreaElement> document.getElementById("_login"));
    let _startexe = (<HTMLButtonElement> document.getElementById("startexe"));
    let _stopexe = (<HTMLButtonElement> document.getElementById("stopexe"));
    
    
    let token = this.cookieSvc.get("token");
    console.log("no puede ser: " + token)
    if(token!= null || token!= undefined || token === ""){
      console.log("polla");
      
      _register.style.display = "none";
      _register.style.visibility = "invisible";
      _startexe.style.display = "flex";
      _startexe.style.visibility = "visible";
      _stopexe.style.display = "flex";
      _stopexe.style.visibility = "visible";


      _login.textContent="User";
      _login.href="/user-management";
  

    }if(token == ""){
      console.log("entra?")
      _register.style.display = "flex";
      _register.style.visibility = "visible";
      _startexe.style.display = "none";
      _startexe.style.visibility = "invisible";
      _stopexe.style.display = "none";
      _stopexe.style.visibility = "invisible";

      
      _login.textContent="Login";
      _login.href="/login";
    }
  }

  startEXE(){

    this.command.command = "run";
    this.cryptoSvc.startEXE(this.command).subscribe(x => alert("Crypto price updater started!"));
  
  }
  stopEXE(){
  
    this.command.command = "stop"
    this.cryptoSvc.startEXE(this.command).subscribe(x => alert("Crypto price updater suspended!"));
  }
  fallbackToStore(){
    window.location.replace('market://details?id=com.express.Express-Coin');

  }

  openApp(){
    window.location.replace('http://');
    this.updateHeader();

  }
  triggerAppOpen(){
    this.openApp();
    setTimeout(this.fallbackToStore, 250);
  }
  updateHeader(){
    
  }

  

}
