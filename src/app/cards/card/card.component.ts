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

  myModel:any;

  ngOnInit(): void {
    // console.log(this.cardData.id)
    this.getCard();
  };

  getCard(){
    this.dbService.readDataFromDB(`cards/${this.cardData.id}`, true).subscribe((data:any) => { 
      this.card = data;
      this.checkCardDetails()
    });

  }


  checkCardDetails(){
    if(this.card.title.trim() == '') this.titleClicked = true;
    // console.log(this.card.title.trim())
    if(this.card.body.trim() == '') this.bodyClicked = true;
  }


  onUpdateCard(type, $event:any){
    if(type === 'title') this.titleClicked = false;
    if(type === 'body') this.bodyClicked = false;
    let result = this.dbService.updateDatatoDB(this.card, `cards/${this.cardData.id}`);
    console.log(result)
  }

}
