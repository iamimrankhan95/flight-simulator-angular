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
  fli: TicketStatus[] = AppConstant.ticketStatus;
  today = new Date();
  fromMinDate = { year: this.today.getFullYear() - 100, month: 1, day: 1 };
  fromMaxDate = { year: this.today.getFullYear() + 100, month: 1, day: 1 };
  maritalStatus = AppConstant.maritalStatus;
  gender = AppConstant.gender;
  isFormSubmitted = false;

  crmForm = this.fb.group({
    DepartureAirportCode: ['', [Validators.required]],
    ArrivalAirportCode: ['', [Validators.required]],
    DepartureDate: [''],
    ReturnDate: [''],
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
