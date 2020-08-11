import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { onlyNumeric, nidValidation } from '../../../shared/services/validation-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketStatus } from '../../../shared/models/dto/ticket-status-dto';
import { AppConstant } from '../../../shared/enums/Constants';
import { FlightSimulatorHttpService } from '../flight-simulator-http.service';
import { FlightSimulatorResponseObject } from '../../../shared/models/dto/flight-simulator-response.dto';
import { FlightSimulatorService } from '../flight-simulator.service';

@Component({
  selector: 'app-flight-simulator',
  templateUrl: './flight-simulator.component.html',
  styleUrls: ['./flight-simulator.component.css']
})
export class FlightSimulatorComponent implements OnInit {

  today = new Date();
  fromMinDate = { year: this.today.getFullYear() - 100, month: 1, day: 1 };
  fromMaxDate = { year: this.today.getFullYear() + 100, month: 1, day: 1 };
  isFlightFormSubmitted = false;

  flightFrm = this.fb.group({
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
    private toastr: ToastrService,
    private flightSimulatorHttpService: FlightSimulatorHttpService,
    private flightSimulatorService: FlightSimulatorService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.isFlightFormSubmitted = true;
    if (!this.flightFrm.valid) {
      this.toastr.error('Form validation failed', 'Error');
      console.log('not valid', this.flightFrm);
      return;
    }

    console.log('valid', this.flightFrm.value);

    const flightFormValue = this.flightFrm.value;
    this.flightSimulatorHttpService.getFlightSimulatorResponseObjects(flightFormValue)
      .subscribe(
        (flights: FlightSimulatorResponseObject[]) => {
          this.flightSimulatorService.flights = flights;
          this.router.navigate(['/list', {
            queryParams: {
              DepartureAirportCode: flightFormValue.DepartureAirportCode,
              ArrivalAirportCode: flightFormValue.ArrivalAirportCode,
              DepartureDate: flightFormValue.DepartureDate,
              ReturnDate: flightFormValue.DepartureDate,
            }
          }]);
        }
      );
  }

}
