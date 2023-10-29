import { Injectable, OnInit } from '@angular/core';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
 } from "firebase/auth";


import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  UserData

  constructor(
    private dbService: DbService
  ) { 
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }


  ngOnInit() {
    console.log()
  }

  auth = getAuth(this.dbService.app);


  createUser(email, password){
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      return userCredential
    })
    .catch((error) => {
      return error
    });
  };

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      this.UserData = userCredential.user;
      return userCredential;
    })
    .catch((error) => {
      return error
    });
  };

  Logout() {
    signOut(this.auth).then(()=> {
      localStorage.removeItem('user');
      this.UserData = null;
    });
  }

  getAuthFire(){
    return this.auth.currentUser;
  };

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  };

}
