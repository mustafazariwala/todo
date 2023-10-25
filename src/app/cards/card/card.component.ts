import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  titleClicked = false;
  bodyClicked = false;

  @Input() cardData: any = {};

  ngOnInit(): void {
  }


}
