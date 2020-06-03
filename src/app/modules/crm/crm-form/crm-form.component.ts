import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css']
})
export class CRMFormComponent implements OnInit {

  addressFormPresent = this.fb.group({
    houseNo: ['', [Validators.required]],
    streetNo: [''],
    division: ['', [Validators.required]],
    district: [''],
    thana: ['', [Validators.required]],
    postOffice: ['']
  });

  addressFormPermanent = this.fb.group({
    houseNo: ['', [Validators.required]],
    streetNo: [''],
    division: ['', [Validators.required]],
    district: ['', [Validators.required]],
    thana: ['', [Validators.required]],
    postOffice: ['']
  });

  crmForm = this.fb.group({
    id: [''],
    uniqueid: [''],
    agentId: [''],
    msisdn: ['', [Validators.required]],
    contactNo: ['', [Validators.required]],
    nidNumber: [''],
    compliantName: ['', [Validators.required]],
    email: [''],
    isHusbandName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    dob: [''],
    occupation: ['', [Validators.required]],
    accusedOrganizationName: ['', [Validators.required]],
    accusedOrganizationAddress: ['', [Validators.required, Validators.maxLength(300)]],
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    permanentAddress: [''],
    presentAddress: [''],
    presentAddressForm: this.addressFormPresent,
    permanentAddressForm: this.addressFormPermanent
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.initForms();
    // let xss = <FormGroup>this.crmForm.get('presentAddressForm').t;
  }

  initForms(): void {
    this.addressFormPresent = this.fb.group({
      houseNo: [null, [Validators.required]],
      streetNo: [],
      division: [null, [Validators.required]],
      district: [],
      thana: [null, [Validators.required]],
      postOffice: [null]
    });

    this.addressFormPermanent = this.fb.group({
      houseNo: [null, [Validators.required]],
      streetNo: [],
      division: [null, [Validators.required]],
      district: [null, [Validators.required]],
      thana: [null, [Validators.required]],
      postOffice: [null]
    });
  }

  previousState(): void {
    window.location.reload();
  }

  save(): void {
    console.log(this.crmForm.value)
  }
}
