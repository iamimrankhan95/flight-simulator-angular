import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { CRMHttpService } from '../crm-http.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crm-edit',
  templateUrl: './crm-edit.component.html',
  styleUrls: ['./crm-edit.component.css']
})
export class CrmEditComponent implements OnInit {

  isFormSubmitted = false;
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
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

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

  // initForms(): void {
  //   this.addressFormPresent = this.fb.group({
  //     houseNo: [null, [Validators.required]],
  //     streetNo: [],
  //     division: [null, [Validators.required]],
  //     district: [],
  //     thana: [null, [Validators.required]],
  //     postOffice: [null]
  //   });

  //   this.addressFormPermanent = this.fb.group({
  //     houseNo: [null, [Validators.required]],
  //     streetNo: [],
  //     division: [null, [Validators.required]],
  //     district: [null, [Validators.required]],
  //     thana: [null, [Validators.required]],
  //     postOffice: [null]
  //   });
  // }

  getCrmFormInfo() {
    this.crmHttpService.getCustomerRelation(+this.route.snapshot.paramMap.get('id'))
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
