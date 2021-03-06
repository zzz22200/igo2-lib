import { Component } from '@angular/core';

import { Feature, FeatureType } from '../../../feature';
import { OverlayService } from '../../../overlay';
import { AnyDataSourceContext, DataSourceService } from '../../../datasource';
import { LayerService } from '../../../layer';
import { MapService } from '../../../map';

import { Register } from '../../shared';
import {MapViewOptions} from '../../../map/shared/map.interface';


@Register({
  name: 'searchResults',
  title: 'igo.searchResults',
  icon: 'search'
})
@Component({
  selector: 'igo-search-results-tool',
  templateUrl: './search-results-tool.component.html',
  styleUrls: ['./search-results-tool.component.styl']
})
export class SearchResultsToolComponent {

  constructor(private overlayService: OverlayService,
              private mapService: MapService,
              private layerService: LayerService,
              private dataSourceService: DataSourceService) { }

  handleFeatureFocus(feature: Feature) {
    if (feature.type === FeatureType.Feature) {
      this.overlayService.setFeatures([feature], 'move');
    }
  }

  handleFeatureSelect(feature: Feature) {
    if (feature.type === FeatureType.Feature) {
      const map = this.mapService.getMap();
      const viewOption: MapViewOptions = {
        projection: 'EPSG:3857',
        center: feature.geometry.coordinates,
        geolocate: true
      };
      map.updateView(viewOption)
      map.zoomTo(17)
      this.overlayService.setFeatures([feature], 'zoom');
    } else if (feature.type === FeatureType.DataSource) {
      const map = this.mapService.getMap();

      if (map !== undefined) {
        this.dataSourceService
          .createAsyncDataSource(feature.layer as AnyDataSourceContext)
          .subscribe(dataSource =>  {
            map.addLayer(
              this.layerService.createLayer(dataSource, feature.layer));
          });
      }
    }
  }

}
