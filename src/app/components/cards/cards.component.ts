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
  cards$: ICard[];
  newCard: ICard = {name: '', id: '', editing:false};
  showAddCardDescription: boolean = false;

  constructor(private _getCardsService: GetCardsService) { }

  ngOnInit() {
    this._getCardsService.getCards(this.listId)
      .subscribe(data => this.cards$ = data);
  }

  addNewCard(){
    this._getCardsService.addCard(this.listId, this.newCard.name)
      .subscribe(data => {
        this.newCard= data;
        this.cards$.push(this.newCard);
        }
      );  
  }
  
  toggleShowAddCardDescription(){
    this.showAddCardDescription = true;
  }

  deleteCard(cardId){
    this.cards$ = this.cards$.filter(card => card.id !== cardId);
    this._getCardsService.deleteCard(cardId)
      .subscribe();
  }

  enableEditCard(card: ICard): void{
    card.editing = true;
  }
  disableEditCard(card: ICard): void{
    card.editing = false;   
  }
  editCard(card){
    this._getCardsService.editCard(card.id, card.name)
      .subscribe();
  }
}
