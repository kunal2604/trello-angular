import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IList } from '../interfaces/list';

const token='4ce752c63440680067488d676bd581baa7c7cdf75c88ce5d79e3233d083792b3'
const key = '765e4970c4a31c132fd0a17307d1c75f';
const boardId = 'vQq0uXvN';
const boardIdBig = '5ce5391af222bb5aa4610302';

@Injectable({
  providedIn: 'root'
})
export class GetListsService {
  apiUrl = `https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`;

  constructor(private http: HttpClient) { }

  getLists(): Observable<IList[]> {
    return this.http.get<IList[]>(this.apiUrl);
  }

  addList(listName): Observable<IList> {
    let apiUrl = `https://api.trello.com/1/lists?key=${key}&token=${token}`;
    let params = new HttpParams().set('name', listName).set('idBoard', boardIdBig);
    return this.http.post<IList>(this.apiUrl, null, {params});
  }
}
