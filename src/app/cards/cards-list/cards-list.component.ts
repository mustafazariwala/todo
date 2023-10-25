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

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.readCardData();
  }

  cards = [];

  draggableListLeft: any[] = [
    {
      content: 'Test 1',
      effectAllowed: 'move',
      disable: false
    },
    {
      content: 'Test 2',
      effectAllowed: 'move',
      disable: false
    },
    {
      content: 'Test 3',
      effectAllowed: 'move',
      disable: false
    },
    {
      content: 'Test 4',
      effectAllowed: 'move',
      disable: false
    }
  ];

  layout = {
    dndHorizontal: true,
  };

  trackByFruit(index: number, fruit: any) {
    return fruit;
  }

  
  readCardData(){
    this.dbService.readDataFromDB('cards').subscribe((data:any) => {
      this.cards = data;
      console.log(this.cards)
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
  }

  onDragEnd(event: DragEvent) {
    console.log('drag ended')
  }
  onDrop(event: DndDropEvent, list) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }

      list.splice(index, 0, event.data);
    }
  }
}
