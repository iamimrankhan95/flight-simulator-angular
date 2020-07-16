import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EscalationService } from '../escalation.service';
import { EscalationHttpService } from '../escalation-http.service';

@Component({
  selector: 'app-create-escalation',
  templateUrl: './create-escalation.component.html',
  styleUrls: ['./create-escalation.component.css']
})
export class CreateEscalationComponent implements OnInit {

  isEscalationFormSubmitted = false;

  escalationForm = this.fb.group({
    id: [''],
    department: ['', [Validators.required]],
    // user: ['', [Validators.required]],
    message: ['']
  });

  constructor(private fb: FormBuilder,
    private escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService) { }

  ngOnInit(): void {

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
