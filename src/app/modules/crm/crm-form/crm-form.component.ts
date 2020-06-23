import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IOption } from 'ng-select';
import { CRMHttpService } from '../crm-http.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css'],
})
export class CRMFormComponent implements OnInit {

  crmFormSubmitted = false;
  addressFormPresent = this.fb.group({
    houseNo: ['', [Validators.required]],
    streetNo: [''],
    division: ['', [Validators.required]],
    district: ['', [Validators.required]],
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
    gender: ['', [Validators.required]],
    email: [''],
    maritalStatus: ['', [Validators.required]],
    spouseName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    dob: [''],
    occupation: ['', [Validators.required]],
    accusedOrganizationName: ['', [Validators.required]],
    accusedOrganizationAddress: ['', [Validators.required, Validators.maxLength(300)]],
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    permanentAddress: this.addressFormPermanent,
    presentAddress: this.addressFormPresent,
    ticketStatus: ['', [Validators.required]],
    applicationType: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private crmHttpService: CRMHttpService,
    private confirmationDialogService: ConfirmationDialogService) { }

  // Datepicker

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  dobDp: NgbDatepicker;

  model: NgbDateStruct;
  date: { year: number, month: number };
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

  async save() {
    // this.crmFormSubmitted = true;
    // if (!this.crmForm.valid) {
    //   return;
    // }
    const confirm = await this.confirmationDialogService.confirm('Confirm Request',
      'Are you sure about creating this CRM',
      'Yes', 'No', 'sm'
    );

    if (confirm) {
      this.crmHttpService.addCustomerRelation(this.crmForm.value)
        .subscribe(
          () => console.log('success'),
          (error) => console.log(error)
        );
    }

  }

  samePermanentAddress(event: any): void {
    if (event.target.checked) {
      const presentAddress = this.crmForm.get('presentAddress').value;

      this.addressFormPermanent.patchValue({
        houseNo: presentAddress.houseNo,
        streetNo: presentAddress.streetNo,
        thana: presentAddress.thana,
        district: presentAddress.district,
        division: presentAddress.division
      });

      this.addressFormPermanent.disable({ onlySelf: true });
    } else {
      console.log('unchecked');
      this.addressFormPermanent.enable({ onlySelf: true });
    }
  }
}
