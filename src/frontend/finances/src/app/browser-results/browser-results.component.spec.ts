import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowserResultsComponent} from './browser-results.component';

describe('BrowserResultsComponent', () => {
  let component: BrowserResultsComponent;
  let fixture: ComponentFixture<BrowserResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
