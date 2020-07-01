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
  complainantPresentAddressForm = this.fb.group({
    houseNo: ['', [Validators.required]],
    streetNo: [''],
    division: ['', [Validators.required]],
    district: ['', [Validators.required]],
    thana: ['', [Validators.required]],
    postOffice: ['']
  });

  complainantPermanentAddressForm = this.fb.group({
    houseNo: ['', [Validators.required]],
    streetNo: [''],
    division: ['', [Validators.required]],
    district: ['', [Validators.required]],
    thana: ['', [Validators.required]],
    postOffice: ['']
  });

  accusedOrganaizationPresentAddressForm = this.fb.group({
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
    accusedOrganizationAddress: this.accusedOrganaizationPresentAddressForm,
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    permanentAddress: this.complainantPermanentAddressForm,
    presentAddress: this.complainantPresentAddressForm,
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
    // this.initForms();
    // let xss = <FormGroup>this.crmForm.get('presentAddressForm').t;
  }

  initForms(): void {
    // this.addressFormPresent = this.fb.group({
    //   houseNo: [null, [Validators.required]],
    //   streetNo: [],
    //   division: [null, [Validators.required]],
    //   district: [],
    //   thana: [null, [Validators.required]],
    //   postOffice: [null]
    // });

    // this.addressFormPermanent = this.fb.group({
    //   houseNo: [null, [Validators.required]],
    //   streetNo: [],
    //   division: [null, [Validators.required]],
    //   district: [null, [Validators.required]],
    //   thana: [null, [Validators.required]],
    //   postOffice: [null]
    // });
  }

  previousState(): void {
    window.location.reload();
  }

  async save() {
    this.isFormSubmitted = true;
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

      this.complainantPresentAddressForm.patchValue({
        houseNo: presentAddress.houseNo,
        streetNo: presentAddress.streetNo,
        thana: presentAddress.thana,
        district: presentAddress.district,
        division: presentAddress.division
      });

      this.complainantPermanentAddressForm.disable({ onlySelf: true });
    } else {
      console.log('unchecked');
      this.complainantPermanentAddressForm.enable({ onlySelf: true });
    }
  }
}
