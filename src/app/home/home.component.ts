import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionKey = '';

  constructor(
    private localStorageService: LocalStorageService,
    private dbService: DbService
  ) {}

  ngOnInit(): void {
    this.generateAndSaveSession();
  }

  generateAndSaveSession(){
    let existingKey = this.localStorageService.GetExistingStorageKey();
    console.log(existingKey);
    if(existingKey) {
      this.sessionKey = existingKey
      return
    }
    this.sessionKey = this.localStorageService.GetNewSessionKey();
    this.addKeytoDB();
  }

  addKeytoDB(){
    this.dbService.saveDatatoDB({sessionKey: this.sessionKey}, '/sessions')
  }
}
