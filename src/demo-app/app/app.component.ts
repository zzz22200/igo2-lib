import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ContextService,
         Feature, FeatureType, FeatureService, IgoMap,
         LanguageService, LayerService, MapService, MessageService,
         OverlayService, ToolService } from '../../lib';

import { AnyDataSourceContext, DataSourceService } from '../../lib/datasource';


@Component({
  selector: 'igo-demo',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  public map = new IgoMap();
  public searchTerm: string;
  public demoForm: FormGroup;

  public records$ = new BehaviorSubject<{[key: string]: any}[]>([]);

  public headers = [
    {
      title: 'ID',
      value: 'id'
    },
    {
      title: 'First Name',
      value: 'firstname'
    },
    {
      title: 'Last Name',
      value: 'lastname'
    }
  ];

  get locationField () {
    return (<FormControl>this.demoForm.controls['location']);
  }

  constructor(public contextService: ContextService,
              public dataSourceService: DataSourceService,
              public featureService: FeatureService,
              public layerService: LayerService,
              public mapService: MapService,
              public messageService: MessageService,
              public overlayService: OverlayService,
              public toolService: ToolService,
              public language: LanguageService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    // If you do not want to load a context from a file,
    // you can simply do contextService.setContext(context)
    // where "context" is an object with the same interface
    // as the contexts in ../contexts/

    this.contextService.loadContext('_default');

    this.demoForm = this.formBuilder.group({
      location: ['', [
        Validators.required
      ]]
    });

    this.records$.next([
      {
        id: 1,
        firstname: 'Bill',
        lastname: 'Gates'
      },
      {
        id: 2,
        firstname: 'Steve',
        lastname: 'Jobs'
      },
      {
        id: 3,
        firstname: 'Marco',
        lastname: 'Polo'
      },
      {
        id: 4,
        firstname: 'Elon',
        lastname: 'Musk'
      }
    ]);
  }

  handleSearch(term: string) {
    this.searchTerm = term;
    const tool = this.toolService.getTool('searchResults');
    if (tool !== undefined) {
      this.toolService.selectTool(tool);
    }
  }

  handleFeatureFocus(feature: Feature) {
    if (feature.type === FeatureType.Feature) {
      this.overlayService.setFeatures([feature], 'move');
    }
  }

  handleFeatureSelect(feature: Feature) {
    if (feature.type === FeatureType.Feature) {
      this.overlayService.setFeatures([feature], 'zoom');
    } else if (feature.type === FeatureType.DataSource) {
      const map = this.mapService.getMap();

      if (map !== undefined) {
        this.dataSourceService
          .createAsyncDataSource(feature.properties as AnyDataSourceContext)
          .subscribe(dataSource =>  {
            map.addLayer(
              this.layerService.createLayer(dataSource, feature.properties));
          });
      }
    }
  }

  clearFeature() {
    this.featureService.unfocusFeature();
    this.overlayService.clear();
  }

  handleFormSubmit(data: any, isValid: boolean) {
    console.log(data);
    console.log(isValid);
  }
}
