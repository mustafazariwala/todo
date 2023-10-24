import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  child,
} from 'firebase/database'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  app = initializeApp(environment.firebaseConfig);
  db = getDatabase(this.app);

  saveDatatoDB(data:any, route: string) {
    const key = push(child(ref(this.db), route)).key;
    let changeData = {
      ...data,
      id: key,
    };
    update(ref(this.db, `${route}/${key}`), changeData).then(() => {
      // Data saved successfully!
      console.log('Data updated', key);
    });
  }
  
  readDataFromDB(route:string) {
    const obs = new Observable((obs) => {
      onValue(ref(this.db, route), (snapshot) => {
        const data = Object.values(snapshot.val());
        obs.next(data);
      });
    });
    return obs;
  }

  firebaseKeyGen(){
    let key = push(child(ref(this.db), 'users/')).key;
    return key;
  };

  

}
