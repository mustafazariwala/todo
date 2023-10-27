import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  key = null;

  GetKey(){
    return this.key
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
