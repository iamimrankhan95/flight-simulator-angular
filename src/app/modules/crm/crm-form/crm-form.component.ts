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
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CrmDto } from '../../../shared/models/dto/crm-dto';
import { CRMService } from '../crm.service';
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
    }),
    permanentAddressForm: this.fb.group({
      address: [''],
      divisionId: ['',],
      districtId: ['',],
      thanaId: ['',],
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
    maritalStatus: [''],
    isHusband: [true, [Validators.required]],
    spouseName: [''],
    fatherName: [''],
    fatherOrHusbandName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    dob: [''],
    occupation: ['', [Validators.required]],
    accusedOrganizationName: ['', [Validators.required]],
    accusedOrganizationAddress: this.accusedOrganaizationAddressForm,
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    complainantAddress: this.complainantAddressForm,
    ticketStatus: ['2', [Validators.required]],
    applicationType: ['1', [Validators.required]],
  });

  isParmanentSame: any = false;
  isEditMode = false;
  crmIdToBeEdited: any;
  crmToBeEdited: void;

  constructor(private fb: FormBuilder,
    private crmHttpService: CRMHttpService,
    private crmService: CRMService,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.crmIdToBeEdited = params['id'] ? params['id'] : null;
        this.isEditMode = params['id'] != null;
        if (this.isEditMode) {
          this.crmService.selectedCrmId = +this.crmIdToBeEdited;
          this.getCrmById(+this.crmIdToBeEdited);
        }
      }
    );
  }

  getCrmById(crmIdToBeEdited: number) {
    this.crmHttpService.getCustomerRelation(crmIdToBeEdited).subscribe(
      (crm: CustomerRelation) => this.initFormForEdit(crm)
    );
  }

  initFormForEdit(crm: CustomerRelation): void {
    this.crmForm.patchValue(crm);
  }

  previousState(): void {
    window.location.reload();
  }

  async onSubmit() {
    const crmFormValue = this.samePermanentAddress(this.isParmanentSame);

    this.isFormSubmitted = true;
    if (!this.crmForm.valid) {
      console.log(this.crmForm);
      console.log('not valid');
      return;
    }

    console.log(this.crmForm.value);

    if (this.isEditMode) {
      const confirm = await this.confirmationDialogService.confirm('Confirm Request',
        'Are you sure about Updating this CRM',
        'Yes', 'No', 'md'
      );

      if (confirm) {
        this.crmHttpService.updateCrmData(crmFormValue, this.crmIdToBeEdited).subscribe(
          (crm: CustomerRelation) => this.initFormForEdit(crm)
        );
      }
    } else {
      const confirm = await this.confirmationDialogService.confirm('Confirm Request',
        'Are you sure about creating this CRM',
        'Yes', 'No', 'md'
      );

      if (confirm) {
        this.crmHttpService.addCustomerRelation(crmFormValue).subscribe(
          () => {
            this.router.navigate(['/home/crm/list']);
          }
        );
      }
    }
  }


  samePermanentAddress(event: any): CustomerRelation {
    let crmFormValue;
    this.isParmanentSame = typeof (event) === 'boolean' ? event : event.target.checked;

    if (this.isParmanentSame) {
      this.crmForm.get('complainantAddress').get('permanentAddressForm').enable();
      const presentAddress = this.crmForm.get('complainantAddress').get('presentAddressForm').value;
      // console.log(presentAddress);
      this.crmForm.get('complainantAddress').get('permanentAddressForm').patchValue({
        address: presentAddress.address,
        thanaId: presentAddress.thanaId,
        districtId: presentAddress.districtId,
        divisionId: presentAddress.divisionId,
        postCode: presentAddress.postCode
      });

      // console.log(this.crmForm.get('complainantAddress').get('permanentAddressForm').value);
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
