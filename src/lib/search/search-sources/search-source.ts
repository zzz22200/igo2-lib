import { Observable } from 'rxjs';

import { Message } from '../../core/message';
import { Feature } from '../../feature';



export abstract class SearchSource {

  abstract enabled: boolean;

  abstract getName(): string;

  abstract search(term?: string): Observable<Feature[] | Message[]>

}
