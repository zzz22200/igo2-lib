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

  @Output() focus = new EventEmitter<{[key: string]: any}>();
  @Output() select = new EventEmitter<{[key: string]: any}>();
  @Output() unfocus = new EventEmitter<{[key: string]: any}>();
  @Output() unselect = new EventEmitter<{[key: string]: any}>();

  constructor() { }
}
