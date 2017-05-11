import { Component } from '@angular/core';

import { Feature, FeatureType, FeatureService } from '../../../feature';
import { OverlayService } from '../../../overlay';

import { Register } from '../../shared';


@Register({
  name: 'featureTable',
  title: 'igo.featureTable',
  icon: 'view_list'
})
@Component({
  selector: 'igo-feature-table-tool',
  templateUrl: './feature-table-tool.component.html',
  styleUrls: ['./feature-table-tool.component.styl']
})
export class FeatureTableToolComponent {

  public headers = [
    {
      title: 'ID',
      value: 'id'
    },
    {
      title: 'Source',
      value: 'source'
    },
    {
      title: 'Type',
      value: 'type'
    },
    {
      title: 'Title',
      value: 'title'
    }
  ];

  constructor(public featureService: FeatureService,
              private overlayService: OverlayService) { }

  handleRecordFocus(record: {[key: string]: any}) {
    console.log(`Record ${record['id']} focused!`);
    if (record['type'] === FeatureType.Feature) {
      this.overlayService.setFeatures([record as Feature], 'move');
    }
  }

  handleRecordSelect(record: {[key: string]: any}) {
    console.log(`Record ${record['id']} selected!`);
    if (record['type'] === FeatureType.Feature) {
      this.overlayService.setFeatures([record as Feature], 'zoom');
    }
  }

}
