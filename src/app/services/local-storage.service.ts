import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private dbService: DbService,
  ) { }

  key = null;
  sessionId = null;

  GetKey(){
    return this.key
  }

  getSessionId(){
    if(!this.sessionId) {
      this.dbService.readDataFromDB('sessions').subscribe((data:any) => {
        let ObjectKeys = Object.values(data);
        let session:any = ObjectKeys.find((session:any) => session.sessionKey === this.GetKey());
        this.sessionId = session.id;
        return this.sessionId
      });
    }
    return this.sessionId
  }

  GetNewSessionKey() {
    this.key = this.generateRandomString(6);
    localStorage.setItem('sessionKey', this.key);
    return this.key;
  }

  GetExistingStorageKey() {
    this.key = localStorage.getItem('sessionKey');
    return this.key;
  };

  generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length);
     result += characters[randomIndex];
    }
    return result.replace(/(.{3})(.{3})/g, '$1-$2');
   }
}
