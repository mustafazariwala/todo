import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

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

  
  readCardData(){
    this.dbService.readDataFromDB('cards').subscribe((data:any) => {
      this.cards = data;
      console.log(this.cards)
    });
  };
}
