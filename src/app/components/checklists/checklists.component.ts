import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IChecklist } from '../../interfaces/checklist';
import { ICheckitem } from '../../interfaces/checkitem';
import { GetChecklistsService } from '../../services/get-checklists.service';

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.css']
})
export class ChecklistsComponent implements OnInit {

  public cardId = this.route.snapshot.paramMap.get('cardId');  // NOT +this.route.snapshot.paramMap.get(..)
  checklists: IChecklist[];
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _getChecklistsService: GetChecklistsService
  ) { }

  ngOnInit() {
    this._getChecklistsService.getChecklists(this.cardId)
      .subscribe(data => this.checklists = data);
  }

  deleteCheckitem(checkitemId){
    // Delete from view
    this.checklists.map(checklist => {
      checklist.checkItems = checklist.checkItems.filter(cItem =>
        cItem.id !== checkitemId
      );
    });
    // Delete from Trello (sending API request)
    this._getChecklistsService.deleteCheckitem(this.cardId, checkitemId)
      .subscribe();
  }

  updateCheckitem(checkitemId, checkitemState){
    let state = checkitemState === "complete" ? 'incomplete' : 'complete';
    console.log(state);
    this._getChecklistsService.updateCheckitem(this.cardId, checkitemId, state)
      .subscribe();
  }

  helloFriends(){
    console.log('Hello friends');
  }
}
