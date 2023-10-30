import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home-bar',
  templateUrl: './home-bar.component.html',
  styleUrls: ['./home-bar.component.css']
})
export class HomeBarComponent {

  constructor(
    private localStorageService: LocalStorageService,
    private dbService: DbService
  ){

  }

  async addNewCard() {
    let newCard:any = await this.dbService.saveDatatoDB({
      title: " ",
      body: " ",
      styleClass: ["bg-danger", "text-light"]
    },"cards");
    console.log(newCard)
    // let newCard = '-Nhp3TWIbRdvBiaovkTl'
    let sessionId = await this.localStorageService.getSessionId()
    console.log(newCard)
    this.dbService.runDBTransaction(`sessions/${sessionId}`, (session)=> {
      let cards = session.cards || [];
      cards.push({id: newCard.key})
      return {...session, cards: cards}
    });
  };

}

