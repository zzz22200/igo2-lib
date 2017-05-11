import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TableHeader } from './table.interface';


@Component({
  selector: 'igo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent {

  @Input()
  get headers(): TableHeader[] { return this._headers; }
  set headers(value: TableHeader[]) {
    this._headers = value;
  }
  private _headers: TableHeader[] = [];

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
