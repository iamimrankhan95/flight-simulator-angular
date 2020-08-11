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
  isFlightFormSubmitted = false;

  crmForm = this.fb.group({
    DepartureAirportCode: ['',
      [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^$|^[A-Za-z0-9]+')]],
    ArrivalAirportCode: ['',
      [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('^$|^[A-Za-z0-9]+')]],
    DepartureDate: ['', [Validators.required]],
    ReturnDate: ['', [Validators.required]],
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
    this.isFlightFormSubmitted = true;
    if (!this.crmForm.valid) {
      console.log('not valid', this.crmForm);
      return;
    }
    console.log('valid', this.crmForm.value);
  }

}
