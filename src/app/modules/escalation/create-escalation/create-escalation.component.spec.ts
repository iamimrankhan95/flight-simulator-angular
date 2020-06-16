import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEscalationComponent } from './create-escalation.component';

describe('CreateEscalationComponent', () => {
  let component: CreateEscalationComponent;
  let fixture: ComponentFixture<CreateEscalationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEscalationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
