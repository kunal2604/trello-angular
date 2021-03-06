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
  public cardName = this.route.snapshot.paramMap.get('cardName'); // to show card-name on popup (where checklists are shown)
  checklists$: IChecklist[];
  showEmptyChecklist:boolean = false;
  newCheckitemName:string = '';
  newCheckitem: ICheckitem = {id: '', name: '', state: 'incomplete'};
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _getChecklistsService: GetChecklistsService
  ) { }

  ngOnInit() {
    this._getChecklistsService.getChecklists(this.cardId)
      .subscribe(data => {
        this.checklists$ = data;
        if(this.checklists$.length === 0) {
          this.showEmptyChecklist = true;
        }
    });
  }

  deleteCheckitem(checkitemId){
    this._getChecklistsService.deleteCheckitem(this.cardId, checkitemId)
      .subscribe(() => {
        this.checklists$.map(checklist => {
          checklist.checkItems = checklist.checkItems.filter(checkItem => 
              checkItem.id !== checkitemId
            );
        })
      });
  }

  inputNewCheckitemName(val){
    this.newCheckitemName = val;
  }

  addCheckitem(checklistId){
    this._getChecklistsService.addCheckitem(checklistId, this.newCheckitemName)
      .subscribe(data => {   // delete from rendering
          this.newCheckitem = data;
          this.checklists$.map(checklist => {
            if(checklist.id === checklistId){ 
              checklist.checkItems.push(this.newCheckitem);
            }
          });
      });
  }
  
  updateCheckitem(checkitemId, checkitemState){
    let state = checkitemState === "complete" ? 'incomplete' : 'complete';
    this._getChecklistsService.updateCheckitem(this.cardId, checkitemId, state)
      .subscribe(() => {
        this.checklists$.map(checklist => {
          checklist.checkItems.map(cItem => {
            if(cItem.id === checkitemId){
              cItem.state = checkitemState === 'complete' ? 'incomplete' : 'complete'
            }
          })
        })
      });
  }
}
