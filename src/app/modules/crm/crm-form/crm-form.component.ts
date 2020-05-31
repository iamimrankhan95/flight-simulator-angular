import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css']
})
export class CRMFormComponent implements OnInit {

  crmForm = this.fb.group({
    id: [],
    uniqueid: [],
    agentId: [],
    msisdn: [null, [Validators.required]],
    contactNo: [null, [Validators.required]],
    nidNumber: [],
    compliantName: [null, [Validators.required]],
    email: [],
    isHusbandName: [null, [Validators.required]],
    fatherName: [null, [Validators.required]],
    motherName: [null, [Validators.required]],
    dob: [],
    occupation: [null, [Validators.required]],
    accusedOrganizationName: [null, [Validators.required]],
    accusedOrganizationAddress: [null, [Validators.required, Validators.maxLength(300)]],
    problemDescription: [null, [Validators.required, Validators.maxLength(500)]],
    permanentAddress: [null],
    presentAddress: [null]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
