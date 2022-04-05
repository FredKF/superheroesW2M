import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'  
})
export class SearchComponent{

  private _filter: string;
  @Input() get filter(){
    return this._filter;
  }

  set filter(val: string){
    this._filter = val;
    this.changed.emit(this.filter);
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
}
