import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { IgoCoreModule } from '../../../core';
import { IgoSharedModule } from '../../../shared';
import { IgoFeatureModule } from '../../../feature';
import { IgoOverlayModule } from '../../../overlay';

import { FeatureTableToolComponent } from './feature-table-tool.component';

describe('FeatureTableToolComponent', () => {
  let component: FeatureTableToolComponent;
  let fixture: ComponentFixture<FeatureTableToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IgoSharedModule,
        IgoCoreModule.forRoot(),
        IgoFeatureModule.forRoot(),
        IgoOverlayModule.forRoot()
      ],
      declarations: [
        FeatureTableToolComponent
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTableToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
