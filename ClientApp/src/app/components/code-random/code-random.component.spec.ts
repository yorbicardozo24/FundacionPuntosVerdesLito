import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRandomComponent } from './code-random.component';

describe('CodeRandomComponent', () => {
  let component: CodeRandomComponent;
  let fixture: ComponentFixture<CodeRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
