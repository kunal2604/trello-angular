import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/card';

const token='4ce752c63440680067488d676bd581baa7c7cdf75c88ce5d79e3233d083792b3'
const key = '765e4970c4a31c132fd0a17307d1c75f';

@Injectable({
  providedIn: 'root'
})
export class GetCardsService {
  constructor(private http: HttpClient) { }
  
  getCards(listId: string): Observable<ICard[]> {
    let apiUrl = `https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`;
    return this.http.get<ICard[]>(apiUrl);
  }

  addCard(listId: string, newCardName: string): Observable<ICard> {
    let apiUrl = `https://api.trello.com/1/cards?name=${newCardName}&idList=${listId}&key=${key}&token=${token}`;
    return this.http.post<ICard>(apiUrl, null);
  }

  deleteCard(cardId:string): Observable<void>{
    let apiUrl = `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`;
    return this.http.delete<void>(apiUrl);
  }

  editCard(cardId:string, newCardName:string): Observable<void>{
    console.log(cardId, ' ', newCardName);
    let apiUrl = `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`;
    let params = new HttpParams().set('name', newCardName);
    return this.http.put<void>(apiUrl, null, {params});
  }
}
