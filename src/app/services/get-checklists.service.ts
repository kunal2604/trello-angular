import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChecklist } from '../interfaces/checklist';
import { ICheckitem } from '../interfaces/checkitem';

const token='4ce752c63440680067488d676bd581baa7c7cdf75c88ce5d79e3233d083792b3'
const key = '765e4970c4a31c132fd0a17307d1c75f';

@Injectable({
  providedIn: 'root'
})
export class GetChecklistsService {

  constructor(private http: HttpClient) { }

  getChecklists(cardId: string): Observable<IChecklist[]>{
    let apiUrl = `https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`;
    return this.http.get<IChecklist[]>(apiUrl);
  }
  deleteCheckitem(cardId: string, checkitemId:string):Observable<void>{
    let apiUrl = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkitemId}?key=${key}&token=${token}`;
    return this.http.delete<void>(apiUrl);
  }
  addCheckitem(checklistId: string, newChecklistName: string): Observable<ICheckitem> {
    let apiUrl = `https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${newChecklistName}&pos=bottom&checked=false&key=${key}&token=${token}`;
    return this.http.post<ICheckitem>(apiUrl, null);
  }

  updateCheckitem(cardId: string, checkitemId:string, state:string):Observable<void>{
    let apiUrl = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkitemId}?key=${key}&token=${token}`;
    let params = new HttpParams().set('state', state);
    return this.http.put<void>(apiUrl, null, {params});
  }
}
