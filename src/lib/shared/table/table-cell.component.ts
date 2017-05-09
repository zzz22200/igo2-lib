import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.styl']
})
export class TableCellComponent {

  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value;
  }
  private _type: string;

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    this._value = value;
  }
  private _value: any;

  constructor() { }

}
