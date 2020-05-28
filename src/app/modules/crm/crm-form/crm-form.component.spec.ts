import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMFormComponent } from './crm-form.component';

describe('CRMFormComponent', () => {
  let component: CRMFormComponent;
  let fixture: ComponentFixture<CRMFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRMFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
