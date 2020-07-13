import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { IOption } from 'ng-select';
import { CRMHttpService } from '../crm-http.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../../shared/enums/Constants';
import { CustomerRelation } from '../../../shared/models/customer-relation.model';
import { NgbDateCustomParserFormatter } from '../../../shared/modules/shared/pipes/date-fomatter';
@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class CRMFormComponent implements OnInit {

  today = new Date();
  fromMinDate = { year: this.today.getFullYear() - 100, month: 1, day: 1 };
  fromMaxDate = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
  maritalStatus = Constants.maritalStatus;
  gender = Constants.gender;
  isFormSubmitted = false;
  complainantAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      divisionId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      thanaId: ['', [Validators.required]],
      postCode: ['']
    }),
    permanentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      divisionId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      thanaId: ['', [Validators.required]],
      postCode: ['']
    })
  });

  accusedOrganaizationAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      divisionId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      thanaId: ['', [Validators.required]],
      postCode: ['']
    })
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
    isHusband: [true, [Validators.required]],
    spouseName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    fatherOrHusbandName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    dob: [''],
    occupation: ['', [Validators.required]],
    accusedOrganizationName: ['', [Validators.required]],
    accusedOrganizationAddress: this.accusedOrganaizationAddressForm,
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    complainantAddress: this.complainantAddressForm,
    ticketStatus: ['', [Validators.required]],
    applicationType: ['', [Validators.required]],
  });
  isParmanentSame: any = false;

  constructor(private fb: FormBuilder,
    private crmHttpService: CRMHttpService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  initForms(): void {

  }

  previousState(): void {
    window.location.reload();
  }

  async save() {
    const crmFormValue = this.samePermanentAddress(this.isParmanentSame);
    console.log(crmFormValue);

    this.isFormSubmitted = true;
    // if (!this.crmForm.valid) {
    //   console.log('not valid');
    //   return;
    // }
    const confirm = await this.confirmationDialogService.confirm('Confirm Request',
      'Are you sure about creating this CRM',
      'Yes', 'No', 'md'
    );

    if (confirm) {
      this.crmHttpService.addCustomerRelation(crmFormValue).subscribe();
    }

  }

  samePermanentAddress(event: any): CustomerRelation {
    let crmFormValue;
    this.isParmanentSame = typeof (event) === 'boolean' ? event : event.target.checked;
    if (this.isParmanentSame) {
      this.crmForm.get('complainantAddress').get('permanentAddressForm').enable();
      const presentAddress = this.crmForm.get('complainantAddress').get('presentAddressForm').value;
      console.log(presentAddress);
      this.crmForm.get('complainantAddress').get('permanentAddressForm').patchValue({
        address: presentAddress.address,
        thanaId: presentAddress.thanaId,
        districtId: presentAddress.districtId,
        divisionId: presentAddress.divisionId,
        postCode: presentAddress.postCode
      });
      console.log(this.crmForm.get('complainantAddress').get('permanentAddressForm').value);
      crmFormValue = this.crmForm.value;
      // console.log(crmFormValue);
      this.crmForm.get('complainantAddress').get('permanentAddressForm').disable();
    } else {
      this.crmForm.get('complainantAddress').get('permanentAddressForm').enable();
      crmFormValue = this.crmForm.value;
      // console.log(crmFormValue);
    }
    return crmFormValue;
  }
}
