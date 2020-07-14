import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { applicationUrl } from '../../shared/enums/application-urls';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../shared/services/http-error-handler.service';
import { CustomerRelation } from '../../shared/models/customer-relation.model';
import { ToastrService } from 'ngx-toastr';
import { CrmDetailsDto } from '../../shared/models/dto/crm-details-dto';
import { TicketStatus } from '../../shared/models/dto/ticket-status-dto';

@Injectable({
  providedIn: 'root'
})
export class EscalationHttpService {

  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private toastr: ToastrService
  ) {
    this.handleError = httpErrorHandler.createHandleError('CRMHttpService');
  }

  getTicketStatuses(): Observable<TicketStatus[]> {
    // const params = this.constructParam(pageConfig);
    return this.http.get<any>(applicationUrl.ticket.status.read)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response.responseList;
        }),
        tap((response: any) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success(response.message, 'Success')
          }
          console.log(response);
        }),
        catchError(this.handleError('getTicketStatuses', []))
      );
  }
}
