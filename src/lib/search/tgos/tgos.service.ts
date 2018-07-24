import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TGOSService {
  /*private AppID : String  = '/9PZSOga/YetRdV5KHCY1XhIG5gGS/OsjGPC3ZrdnVsaAW9HlEeErw=='
  private APIKey: String  = 'cGEErDNy5yNr14zbsE/4GSfiGP5i3PuZwlsR5ASVWUusGuHdTAiJg5chYjOvjS3dT/+AxjWh4SAqLnjPk5CztZfjheHzw4PQT8kokv5IabMs+qhUkbRGw1+nl6cKO4lA5QwYo9od0EewQSHTIL9HmjFXwLDQ1yp3nMYbvckV0zMDUW1jTm8pYyVc8IKMJOyAHd8ODeIwmuW9a+M6QAvhtkd7iPJdfgAqhCS5vrF3CoUadr7QgKluD2Z7pg5zxao+oL90prUmGE+zITCV8sYsykVoj73VBsi7p+VSZtkkochCFllth9jGSs032295yeqSewR+O0j/FbC3KFzp3aqsjoBGGjqtIoD1vDEStPXueTm7+P5cTERUZpH+bu7gyLTX';
  private gosURL: String  = 'http://addr.tgos.nat.gov.tw/addrws/v30/QueryAddr.asmx/QueryAddr'*/




  serviceUrl = 'http://addr.tgos.nat.gov.tw/addrws/v30/QueryAddr.asmx/QueryAddr?_dc=1467083923420' +
    '&oAPPId=%2F9PZSOga%2FYetRdV5KHCY1XhIG5gGS%2FOsjGPC3ZrdnVsaAW9HlEeErw%3D%3D' +
    '&oAPIKey=cGEErDNy5yNr14zbsE%2F4GSfiGP5i3PuZwlsR5ASVWUusGuHdTAiJg5chYjOvjS3dT%2F%2BAxjWh4SAqLnjPk5CztZfjheHzw4PQT8kokv5IabMs%2BqhUkbRGw1%2Bnl6cKO4lA5QwYo9od0EewQSHTIL9HmjFXwLDQ1yp3nMYbvckV0zMDUW1jTm8pYyVc8IKMJOyAHd8ODeIwmuW9a%2BM6QAvhtkd7iPJdfgAqhCS5vrF3CoUadr7QgKluD2Z7pg5zxao%2BoL90prUmGE%2BzITCV8sYsykVoj73VBsi7p%2BVSZtkkochCFllth9jGSs032295yeqSewR%2BO0j%2FFbC3KFzp3aqsjoBGGjqtIoD1vDEStPXueTm7%2BP5cTERUZpH%2Bbu7gyLTX' +
    '&oAddress=' + '台北市大安區敦化南路二段164號' +
    '&oSRS=EPSG%3A4326&oFuzzyType=2&oResultDataType=json&oFuzzyBuffer=0&oIsOnlyFullMatch=false&oIsLockCounty=false&oIsLockTown=false&oIsLockVillage=false&oIsLockRoadSection=false&oIsLockLane=false&oIsLockAlley=false&oIsLockArea=false&oIsSameNumber_SubNumber=false&oCanIgnoreVillage=false&oCanIgnoreNeighborhood=false&oReturnMaxCount=0'

    constructor(private http: HttpClient) { }
    public getXYRestQuery(): Observable<any> {
        this.http.get(this.serviceUrl, { responseType: 'text' })
          .map(res => res.substring(res.indexOf('{'), res.lastIndexOf('}')))
          .subscribe(response => {
            console.log(response);
        });
        return this.http.get(this.serviceUrl, { responseType: 'text' });
    }

}


