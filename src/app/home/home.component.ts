import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionKey = '';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.generateAndSaveSession();
  }

  generateAndSaveSession(){
    this.sessionKey = this.localStorageService.GetNewSessionKey();
  }
}
