import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-escalation',
  templateUrl: './create-escalation.component.html',
  styleUrls: ['./create-escalation.component.css']
})
export class CreateEscalationComponent implements OnInit {

  isEscalationFormSubmitted = false;
  @ViewChild('escalationFormRef') escalationFormEl;
  escalationForm = this.fb.group({
    id: [''],
    department: ['', [Validators.required]],
    user: [''],
    message: ['']
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  submitEscalationForm() {
    this.escalationFormEl.nativeElement.submit();
    
  }

  onSubmitEscalationForm(){
    console.log(this.escalationForm.value);
    this.isEscalationFormSubmitted = true;
    ;console.log(this.escalationForm.value);
    if(!this.escalationForm.valid){
      return;
    }
  }
}
