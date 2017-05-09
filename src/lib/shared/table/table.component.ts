import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Header } from './table.interface';


@Component({
  selector: 'igo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent {

  @Input()
  get headers(): Header[] { return this._headers; }
  set headers(value: Header[]) {
    this._headers = value;
  }
  private _headers: Header[] = [];

  @Input()
  get records(): {[key: string]: any}[] { return this._records; }
  set records(value: {[key: string]: any}[] ) {
    this._records = value;
  }
  private _records: {[key: string]: any}[] = [];

  /*@Input()
  get navigation() { return this._navigation; }
  set navigation(value: boolean) {
    this._navigation = value;
  }
  private _navigation: boolean = true;

  @Input()
  get selection() { return this._selection; }
  set selection(value: boolean) {
    this._selection = value;
  }
  private _selection: boolean = true;

  get selectedItem() { return this._selectedItem; }
  set selectedItem(value: ListItemDirective) {
    this.focusedItem = value;
    this._selectedItem = value;
  }
  private _selectedItem: ListItemDirective;

  get focusedItem() { return this._focusedItem; }
  set focusedItem(value: ListItemDirective) {
    this._focusedItem = value;
    if (value !== undefined) {
      this.scrollToItem(value);
    }
  }
  private _focusedItem: ListItemDirective;*/

  @Output() focus = new EventEmitter<{[key: string]: any}>();
  @Output() select = new EventEmitter<{[key: string]: any}>();
  @Output() unfocus = new EventEmitter<{[key: string]: any}>();
  @Output() unselect = new EventEmitter<{[key: string]: any}>();

  constructor() { }
}
