import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  child,
  runTransaction
} from 'firebase/database'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  sessionId = null;

  constructor() {
    console.log(environment)
  }

  app = initializeApp(environment.firebaseConfig);
  db = getDatabase(this.app);

  async saveDatatoDB(data:any, route: string) {
    const key = await push(child(ref(this.db), route)).key;
    let changeData = {
      ...data,
      id: key,
    };
    return update(ref(this.db, `${route}/${key}`), changeData).then((response) => {
      console.log(response)
      return {
        response: response,
        key: key
      };
    });
  };

  updateDatatoDB(data:any, route: string) {
    update(ref(this.db, `${route}`), data).then((response) => {
      console.log(response)
      return response
    });
  }
  
  readDataFromDB(route:string, once=false) {
    if(once){
      const obs = new Observable((obs) => {
        onValue(ref(this.db, route), (snapshot) => {
          const data = snapshot.val();
          obs.next(data);
        },  {
          onlyOnce: true
        });
      });
      return obs;
    } else{
      const obs = new Observable((obs) => {
        onValue(ref(this.db, route), (snapshot) => {
          const data = snapshot.val();
          obs.next(data);
        });
      });
      return obs;
    }
  }

  runDBTransaction(route:string, dataManupulation:any){
    runTransaction(ref(this.db, route), (currentData) => {
      if(currentData){
        return dataManupulation(currentData)
      }
      return currentData
    })
  }

  firebaseKeyGen(){
    let key = push(child(ref(this.db), 'users/')).key;
    return key;
  };



}
