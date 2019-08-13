import { Component, OnInit, Input } from '@angular/core';
import { GetCardsService } from '../../services/get-cards.service';
import { ICard } from '../../interfaces/card';

@Component({  
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() public listId: string;
  cards: ICard[];

  constructor(private _getCardsService: GetCardsService) { }

  ngOnInit() {
    this._getCardsService.getCards(this.listId)
      .subscribe(data => this.cards = data);
  }
}
