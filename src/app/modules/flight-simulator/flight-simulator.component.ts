import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { onlyNumeric, nidValidation } from '../../shared/services/validation-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketStatus } from '../../shared/models/dto/ticket-status-dto';
import { AppConstant } from '../../shared/enums/Constants';

@Component({
  selector: 'app-flight-simulator',
  templateUrl: './flight-simulator.component.html',
  styleUrls: ['./flight-simulator.component.css']
})
export class FlightSimulatorComponent implements OnInit {

  isCollapsed: boolean = false;
  ticketStatuses: TicketStatus[] = AppConstant.ticketStatus;
  today = new Date();
  fromMinDate = { year: this.today.getFullYear() - 100, month: 1, day: 1 };
  fromMaxDate = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
  maritalStatus = AppConstant.maritalStatus;
  gender = AppConstant.gender;
  isFormSubmitted = false;

  crmForm = this.fb.group({
    id: [''],
    uniqueid: [''],
    agentId: [''],
    msisdn: ['', [Validators.required]],
    contactNo: ['', [Validators.required]],
    nidNumber: ['', [Validators.required, onlyNumeric(), nidValidation()]],
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
    problemDescription: ['', [Validators.required, Validators.maxLength(500)]],
    ticketStatus: ['2', [Validators.required]],
    applicationType: ['1', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
  }

}
