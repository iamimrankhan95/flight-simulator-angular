import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IOption } from 'ng-select';
import { CRMHttpService } from '../crm-http.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../../shared/enums/Constants';
import { CustomerRelation } from '../../../shared/models/customer-relation.model';
@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css'],
})
export class CRMFormComponent implements OnInit {

  maritalStatus = Constants.maritalStatus;
  isFormSubmitted = false;
  complainantAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],
      thana: ['', [Validators.required]],
      postOffice: ['']
    }),
    permanentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],
      thana: ['', [Validators.required]],
      postOffice: ['']
    })
  });

  accusedOrganaizationAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      address: ['', [Validators.required]],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],
      thana: ['', [Validators.required]],
      postOffice: ['']
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
    spouseName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
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

  // Datepicker

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  dobDp: NgbDatepicker;

  model: NgbDateStruct;
  date: { year: number, month: number };
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
    if (!this.crmForm.valid) {
      console.log('not valid');
      return;
    }
    const confirm = await this.confirmationDialogService.confirm('Confirm Request',
      'Are you sure about creating this CRM',
      'Yes', 'No', 'md'
    );

    if (confirm) {
      this.crmHttpService.addCustomerRelation(crmFormValue)
        .subscribe(
          () => {
            this.toastr.success('CRM saved successfully', 'Successful');
          },
          (error) => console.log(error)
        );
    }

  }

  samePermanentAddress(event: any): CustomerRelation {
    let crmFormValue;
    this.isParmanentSame = typeof (event) === 'boolean' ? event : event.target.checked;
    if (this.isParmanentSame) {
      this.crmForm.get('complainantAddress').get('permanentAddressForm').enable();
      const presentAddress = this.crmForm.get('complainantAddress').get('presentAddressForm').value;

      this.crmForm.get('complainantAddress').get('permanentAddressForm').patchValue({
        address: presentAddress.houseNo,
        thana: presentAddress.thana,
        district: presentAddress.district,
        division: presentAddress.division
      });
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
