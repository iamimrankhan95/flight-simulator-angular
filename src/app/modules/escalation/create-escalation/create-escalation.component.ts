import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
export class CreateEscalationComponent implements OnInit {

  isEscalationFormSubmitted = false;
  @Input()
  selectedTicketStatus: TicketStatus;

  escalationForm = this.fb.group({
    id: [''],
    department: ['', [Validators.required]],
    // user: ['', [Validators.required]],
    message: ['']
  });

  departments: DepartmentDto[];

  constructor(private fb: FormBuilder,
    public escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService,
    private appHttpService: AppHttpService) { }

  ngOnInit(): void {
    this.appHttpService.getDepartments().subscribe(
      departments => this.departments = departments
    );

    this.escalationService.selectedTicketStatusId = 5;
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
}
