import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IOption } from 'ng-select';
import { CRMHttpService } from '../crm-http.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css'],
})
export class CRMFormComponent implements OnInit {

  isFormSubmitted = false;
  complainantAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      houseNo: ['', [Validators.required]],
      streetNo: [''],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],
      thana: ['', [Validators.required]],
      postOffice: ['']
    }),
    permanentAddressForm: this.fb.group({
      houseNo: ['', [Validators.required]],
      streetNo: [''],
      division: ['', [Validators.required]],
      district: ['', [Validators.required]],
      thana: ['', [Validators.required]],
      postOffice: ['']
    })
  });

  accusedOrganaizationAddressForm = this.fb.group({
    presentAddressForm: this.fb.group({
      houseNo: ['', [Validators.required]],
      streetNo: [''],
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
    this.isFormSubmitted = true;
    console.log(this.crmForm.value);
    if (!this.crmForm.valid) {
      return;
    }
    const confirm = await this.confirmationDialogService.confirm('Confirm Request',
      'Are you sure about creating this CRM',
      'Yes', 'No', 'md'
    );

    if (confirm) {
      this.crmHttpService.addCustomerRelation(this.crmForm.value)
        .subscribe(
          () => {
            console.log('success');
            this.toastr.success('CRM saved successfully', 'Successful');
          },
          (error) => console.log(error)
        );
    }

  }

  samePermanentAddress(event: any): void {
    if (event.target.checked) {
      const presentAddress = this.crmForm.get('presentAddress').value;

      this.complainantAddressForm.get('parmanentAddressForm').patchValue({
        houseNo: presentAddress.houseNo,
        streetNo: presentAddress.streetNo,
        thana: presentAddress.thana,
        district: presentAddress.district,
        division: presentAddress.division
      });

      this.complainantAddressForm.get('parmanentAddressForm').disable({ onlySelf: true });
    } else {
      console.log('unchecked');
      this.complainantAddressForm.get('parmanentAddressForm').enable({ onlySelf: true });
    }
  }
}
