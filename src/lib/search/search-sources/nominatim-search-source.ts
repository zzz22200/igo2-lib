import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../core';
import {
  Feature,
  FeatureType,
  FeatureFormat,
  SourceFeatureType
} from '../../feature';

import { SearchSource } from './search-source';
import { SearchSourceOptions } from './search-source.interface';

@Injectable()
export class NominatimSearchSource extends SearchSource {
  get enabled(): boolean {
    return this.options.enabled !== false;
  }
  set enabled(value: boolean) {
    this.options.enabled = value;
  }

  static _name: string = 'Nominatim (OSM)';
  static sortIndex: number = 10;

  private searchUrl: string = 'https://nominatim.openstreetmap.org/search';
  private locateUrl: string = 'https://nominatim.openstreetmap.org/reverse';
  private options: SearchSourceOptions;
  data: any;
  serviceUrl: string = 'http://addr.tgos.nat.gov.tw/addrws/v30/QueryAddr.asmx/QueryAddr?_dc=1467083923420' +
    '&oAPPId=%2F9PZSOga%2FYetRdV5KHCY1XhIG5gGS%2FOsjGPC3ZrdnVsaAW9HlEeErw%3D%3D' +
    '&oAPIKey=cGEErDNy5yNr14zbsE%2F4GSfiGP5i3PuZwlsR5ASVWUusGuHdTAiJg5chYjOvjS3dT%2F%2BAxjWh4SAqLnjPk5CztZfjheHzw4PQT8kokv5IabMs%2BqhUkbRGw1%2Bnl6cKO4lA5QwYo9od0EewQSHTIL9HmjFXwLDQ1yp3nMYbvckV0zMDUW1jTm8pYyVc8IKMJOyAHd8ODeIwmuW9a%2BM6QAvhtkd7iPJdfgAqhCS5vrF3CoUadr7QgKluD2Z7pg5zxao%2BoL90prUmGE%2BzITCV8sYsykVoj73VBsi7p%2BVSZtkkochCFllth9jGSs032295yeqSewR%2BO0j%2FFbC3KFzp3aqsjoBGGjqtIoD1vDEStPXueTm7%2BP5cTERUZpH%2Bbu7gyLTX' +
    '&oAddress=';
  serviceUrl2: string = '&oSRS=EPSG%3A4326&oFuzzyType=2&oResultDataType=json&oFuzzyBuffer=0&oIsOnlyFullMatch=false&oIsLockCounty=false&oIsLockTown=false&oIsLockVillage=false&oIsLockRoadSection=false&oIsLockLane=false&oIsLockAlley=false&oIsLockArea=false&oIsSameNumber_SubNumber=false&oCanIgnoreVillage=false&oCanIgnoreNeighborhood=false&oReturnMaxCount=0'


  constructor(private http: HttpClient, private config: ConfigService) {
    super();

    this.options = this.config.getConfig('searchSources.nominatim') || {};
    this.searchUrl = this.options.url || this.searchUrl;
    this.locateUrl = this.options.locateUrl || this.locateUrl;
  }

  getName(): string {
    return NominatimSearchSource._name;
  }

  search(term?: string): Observable<Feature[]> {
    return this.getTogsResult(term).map(res => this.extractData2(res, SourceFeatureType.Search));
  }

  locate(
    coordinate: [number, number],
    zoom: number
  ): Observable<Feature[]> {
    const locateParams = this.getLocateParams(coordinate, zoom);
    return this.http
      .get(this.locateUrl, { params: locateParams })
      .map(res => this.extractData2([res], SourceFeatureType.LocateXY));
  }

  /*private extractData(response, resultType): Feature[] {
    if (response[0] && response[0].error) {
      return [];
    }
    return response.map(this.formatResult, resultType);
  }*/
  private extractData2(response, resultType): Feature[] {
    if (response[0] && response[0].error) {
      return [];
    }
    return response.map(this.formatResultForTGos, resultType);
  }

  /*private getSearchParams(term: string): HttpParams {
    const limit = this.options.limit === undefined ? 5 : this.options.limit;
    return new HttpParams({
      fromObject: {
        q: term,
        format: 'json',
        limit: String(limit)
      }
    });
  }*/

  private getLocateParams(
    coordinate: [number, number],
    zoom: number
  ): HttpParams {
    return new HttpParams({
      fromObject: {
        lat: String(coordinate[1]),
        lon: String(coordinate[0]),
        format: 'json',
        zoom: String(zoom),
        polygon_geojson: String(1)
      }
    });
  }

  private getTogsResult(term: string): Observable<any> {
    let togsUrl: string = this.serviceUrl + term + this.serviceUrl2;

    return this.http.get(togsUrl, { responseType: 'text' })
      .map(res => res.substring(res.indexOf('{'), res.lastIndexOf('}') + 1))
      .map(text => JSON.parse(text))
      .map(resJson => resJson.AddressList);
  }
  /*private formatResult(result: any, resultType): Feature {
    return {
      id: result.place_id,
      source: NominatimSearchSource._name,
      sourceType: resultType,
      order: 0,
      type: FeatureType.Feature,
      format: FeatureFormat.GeoJSON,
      title: result.display_name,
      icon: 'place',
      projection: 'EPSG:4326',
      properties: {
        name: result.display_name,
        place_id: result.place_id,
        osm_type: result.osm_type,
        class: result.class,
        type: result.type
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(result.lon), parseFloat(result.lat)]
      },
      extent: [
        parseFloat(result.boundingbox[2]),
        parseFloat(result.boundingbox[0]),
        parseFloat(result.boundingbox[3]),
        parseFloat(result.boundingbox[1])
      ]
    };
  }*/
  private formatResultForTGos(result: any, resultType): Feature {
    return {
      id: 'whatever',
      source: NominatimSearchSource._name,
      sourceType: resultType,
      order: 0,
      type: FeatureType.Feature,
      format: FeatureFormat.GeoJSON,
      title: result.FULL_ADDR,
      icon: 'place',
      projection: 'EPSG:4326',
      properties: {
        name: result.FULL_ADDR,
        place_id: 'whatever',
        osm_type: 'whatever',
        class: 'whatever',
        type: 'whatever'
      },
      geometry: {
        type: 'Point',
        coordinates: [result.X, result.Y]
      },
      extent: [
        result.Y,
        result.X,
        result.Y,
        result.X
      ]
    };
  }
}
