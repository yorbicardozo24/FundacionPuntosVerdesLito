import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationProfileComponent } from './foundation-profile.component';

describe('FoundationProfileComponent', () => {
  let component: FoundationProfileComponent;
  let fixture: ComponentFixture<FoundationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
