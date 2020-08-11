import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { applicationUrl } from '../../shared/enums/application-urls';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../shared/services/http-error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { CrmDtoForList } from '../../shared/models/dto/crm-dto-for-list';
import { AuthenticationService } from '../auth/authentication.service';
import { FlightSimulatorResponseObject } from '../../shared/models/dto/flight-simulator-response.dto';
import { FlightSimulatorService } from './flight-simulator.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FlightSimulatorHttpService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private flightSimulatorService: FlightSimulatorService
  ) {
    this.handleError = httpErrorHandler.createHandleError('FlightSimulatorHttpService');
  }

  getFlightSimulatorResponseObjects(formData): Observable<FlightSimulatorResponseObject[]> {
    const requestData = this.flightSimulatorService.convertToRequestData(formData);
    return this.http.post<FlightSimulatorResponseObject[]>(applicationUrl.flightSimulator.read, requestData)
      .pipe(
        tap((flightSimulatorResponseObjectList: FlightSimulatorResponseObject[]) => {
          if (flightSimulatorResponseObjectList) {
            this.toastr.success('Flight List loaded successfully!', 'Success')
          }
          console.log(flightSimulatorResponseObjectList);
        }),
        map((flightSimulatorResponseObjectList: FlightSimulatorResponseObject[]) => {
          return flightSimulatorResponseObjectList;
        }),
        catchError(this.handleError('getFlightSimulatorResponseObjects', []))
      );
  }
}
