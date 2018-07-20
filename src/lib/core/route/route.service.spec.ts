import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { RouteService } from '.';
import {of} from 'rxjs';

describe('RouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({zoom: 8})
          }
        },
        RouteService
      ]
    });
  });

  it('should ...', inject([RouteService], (service: RouteService) => {
    expect(service).toBeTruthy();
  }));
});
