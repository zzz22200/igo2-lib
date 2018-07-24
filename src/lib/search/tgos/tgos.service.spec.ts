import { TestBed, inject } from '@angular/core/testing';

import { TGOSService } from './tgos.service';

describe('TGOSService', () => {
    let service:TGOSService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TGOSService]
    });
  });
    it('#getObservableValue should return value from observable',
        (done: DoneFn) => {
            service.getXYRestQuery().subscribe(value => {
                expect(value).toBe('observable value');
                done();
            });
        });
  it('should be created', inject([TGOSService], (service: TGOSService) => {
    expect(service).toBeTruthy();
  }));
});
