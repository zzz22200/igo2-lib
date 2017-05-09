import { Component, Input } from '@angular/core';

@Component({
  selector: 'igo-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.styl']
})
export class TableHeaderComponent {

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

  @Input()
  get sort(): boolean { return this._sort; }
  set sort(value: boolean) {
    this._sort = value;
  }
  private _sort: boolean;

  constructor() { }

}
