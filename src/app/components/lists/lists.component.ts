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

  ngOnInit() {
    this._getListsService.getLists()
      .subscribe(data => this.lists$ = data);
  }
}
