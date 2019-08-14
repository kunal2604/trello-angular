import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChecklist } from '../interfaces/checklist';

const token='4ce752c63440680067488d676bd581baa7c7cdf75c88ce5d79e3233d083792b3'
const key = '765e4970c4a31c132fd0a17307d1c75f';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

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
    return this.http.delete<void>(apiUrl, httpOptions);
  }
}
