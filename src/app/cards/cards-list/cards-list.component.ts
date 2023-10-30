import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndPlaceholderRefDirective,
  DropEffect,
  EffectAllowed,
} from 'ngx-drag-drop';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  constructor(
    private dbService: DbService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.readSessionKeyData();
  }

  cards = [];
  session:any = {cards:[]};


  trackByFruit(index: number, fruit: any) {
    return fruit;
  }

  
  readSessionKeyData(){
    this.dbService.readDataFromDB('sessions').subscribe((data:any) => {
      let ObjectKeys = Object.values(data);
      this.session = ObjectKeys.find((session:any) => session.sessionKey === this.localStorageService.GetKey());
      if(this.cards.length != this.session.cards.length) this.cards = this.session.cards
    });
  };

  onDragStart(event: DragEvent) {
    console.log('drag started')
  }

  onDragged(index: number, fruit: any, list: any[]) {
    const removeIndex = list.indexOf(fruit);
    console.log(
      `onDragged ngFor-index=${index}, item=${fruit}, removeIndex=${removeIndex}, list=${list.length}`
    );
    list.splice(removeIndex, 1);
    this.dbService.updateDatatoDB({cards: list}, `sessions/${this.session.id}`)
  }

  onDragEnd(event: DragEvent) {
    console.log('drag ended')
  }
  async onDrop(event: DndDropEvent, list) {
    // console.log(list)
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
      // console.log(list)
    }
  }
}
