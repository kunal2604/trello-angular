import { Component, OnInit } from '@angular/core';
import { IList } from '../../interfaces/list';
import { GetListsService } from '../../services/get-lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private _getListsService: GetListsService) { }
  lists$: IList[];
  showAddNewList: boolean = false;
  newList: IList = {id: '', name:''};
  public newListName: string = '';

  ngOnInit() {
    this._getListsService.getLists()
      .subscribe(data => this.lists$ = data);
  }

  addList(){
    this._getListsService.addList(this.newListName)
      .subscribe(data => {
        this.newList = data;
        this.lists$.push(this.newList);
      });
  }
}
