import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmEditComponent } from './crm-edit.component';

describe('CrmEditComponent', () => {
  let component: CrmEditComponent;
  let fixture: ComponentFixture<CrmEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
