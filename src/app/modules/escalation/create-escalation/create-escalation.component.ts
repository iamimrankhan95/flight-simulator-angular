import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EscalationService } from '../escalation.service';
import { EscalationHttpService } from '../escalation-http.service';
import { AppHttpService } from '../../../app-http.service';
import { DepartmentDto } from '../../../shared/models/dto/department-dto';
import { TicketStatus } from '../../../shared/models/dto/ticket-status-dto';

@Component({
  selector: 'app-create-escalation',
  templateUrl: './create-escalation.component.html',
  styleUrls: ['./create-escalation.component.css']
})
export class CreateEscalationComponent implements OnInit, OnDestroy {

  isEscalationFormSubmitted = false;

  escalationForm = this.fb.group({
    id: [''],
    department: ['', [Validators.required]],
    // user: ['', [Validators.required]],
    message: ['']
  });

  departments: DepartmentDto[];
  selectedTicketStatus: TicketStatus = new TicketStatus();
  ticketStatusChangedSubscription: any;

  constructor(private fb: FormBuilder,
    public escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService,
    private appHttpService: AppHttpService) { }

  ngOnInit(): void {

    this.appHttpService.getDepartments().subscribe(
      departments => this.departments = departments
    );

    this.ticketStatusChangedSubscription = this.escalationService.ticketStatusChanged$.subscribe(
      (ticketStatus: TicketStatus) => {
        console.log(ticketStatus);
        this.selectedTicketStatus = ticketStatus;
        if (ticketStatus.id === 5) {
          this.escalationForm.get('department').setValidators([Validators.required]);
          this.escalationForm.controls['department'].updateValueAndValidity();
        } else {
          this.escalationForm.get('department').setValidators([]);
          this.escalationForm.controls['department'].updateValueAndValidity();
        }
      }
    );

  }

  submitEscalationForm() {
    this.onSubmitEscalationForm();
  }

  onSubmitEscalationForm() {

    this.isEscalationFormSubmitted = true;

    if (!this.escalationForm.valid) {
      console.log(this.escalationForm);
      return;
    }

    this.escalationHttpService.updateTicketStatus(this.escalationForm.value).subscribe();

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.ticketStatusChangedSubscription.unsubscribe();
  }
}
