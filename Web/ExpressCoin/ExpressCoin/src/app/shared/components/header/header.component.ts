import { Component, OnInit } from '@angular/core';
import { RunEXECommand } from 'src/app/models/runExecommand.model';
import { CryptoService } from '../services/cryptoService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  command : RunEXECommand = new RunEXECommand("");
  constructor(private cryptoSvc : CryptoService) { }

  ngOnInit(): void {
  }

  startEXE(){

    this.command.command = "run";
    this.cryptoSvc.startEXE(this.command).subscribe(x => alert("Crypto price updater started!"));
  
  }
  stopEXE(){
  
    this.command.command = "stop"
    this.cryptoSvc.startEXE(this.command).subscribe(x => alert("Crypto price updater suspended!"));
  }

}
