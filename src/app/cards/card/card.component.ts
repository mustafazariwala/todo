import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  titleClicked = false;
  bodyClicked = false;

  constructor(
    private dbService: DbService
  ){

  }

  @Input() cardData: any = {};

  card = {
    title: '',
    body: '',
    styleClass: []
  };

  ngOnInit(): void {
    // console.log(this.cardData.id)
    this.getCard();
  };

  getCard(){
    this.dbService.readDataFromDB(`cards/${this.cardData.id}`, true).subscribe((data:any) => { 
      console.log(data)
      this.card = data;
    });
  }

}
