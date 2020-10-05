import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAdminComponent } from './history-admin.component';

describe('HistoryAdminComponent', () => {
  let component: HistoryAdminComponent;
  let fixture: ComponentFixture<HistoryAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
