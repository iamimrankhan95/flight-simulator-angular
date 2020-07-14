import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationContainerComponent } from './escalation-container.component';

describe('EscalationContainerComponent', () => {
  let component: EscalationContainerComponent;
  let fixture: ComponentFixture<EscalationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
