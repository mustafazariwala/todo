import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  GetNewSessionKey() {
    const key = this.generateRandomString(6);
    localStorage.setItem('sessionKey', key);
    return key;
  }

  generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length);
     result += characters[randomIndex];
    }
    return result;
   }
}
