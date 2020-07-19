import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { applicationUrl } from '../../shared/enums/application-urls';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../shared/services/http-error-handler.service';
import { CustomerRelation } from '../../shared/models/customer-relation.model';
import { ICRMListPageConfig } from './crm-list/icrm-list-page-config';
import { CRMService } from './crm.service';
import { ToastrService } from 'ngx-toastr';
import { CrmDetailsDto } from '../../shared/models/dto/crm-details-dto';
import { CrmDtoForList } from '../../shared/models/dto/crm-dto-for-list';
import { CrmDto } from '../../shared/models/dto/crm-dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class CRMHttpService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private crmService: CRMService,
    private toastr: ToastrService
  ) {
    this.handleError = httpErrorHandler.createHandleError('CRMHttpService');
  }

  /** GET heroes from the server */
  getCustomerRelations(pageConfig: ICRMListPageConfig): Observable<CrmDtoForList[]> {
    // const params = this.constructParam(pageConfig);
    return this.http.get<any[]>(applicationUrl.crm.read)
      .pipe(
        tap((response: any) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success('CRM loaded successfully!', 'Success')
          }
          console.log(response);
        }),
        map((response: any) => {
          return response.responseList;
        }),
        catchError(this.handleError('getCustomerRelations', []))
      );
  }

  constructParam(pageConfig: ICRMListPageConfig): HttpParams {
    let params = new HttpParams()
      .set('pageNo', (pageConfig.pageNo - 1).toString())
      .set('pageSize', pageConfig.pageSize.toString())
      .set('mobileNo', pageConfig.mobileNo ? pageConfig.mobileNo : '')
      .set('fromDate', pageConfig.fromDate ? pageConfig.fromDate : '')
      .set('toDate', pageConfig.toDate ? pageConfig.toDate : '')
      .set('status', pageConfig.status);
    return params;
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<CustomerRelation[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<CustomerRelation[]>(applicationUrl.crm.find, options)
      .pipe(
        catchError(this.handleError<CustomerRelation[]>('searchHeroes', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the database */
  addCustomerRelation(customerRelation: CustomerRelation): Observable<CustomerRelation> {
    return this.http.post<any>(applicationUrl.crm.create, this.crmService.convertToCrmDto(customerRelation, null), httpOptions)
      .pipe(
        tap((response) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success('CRM saved successfully!', 'Success')
          }
        }),
        catchError(this.handleError('addCustomerRelation', customerRelation))
      );
  }

  // Get information on specific crm
  getCustomerRelation(crmID: number): Observable<CustomerRelation> {
    return this.http.get<any>(applicationUrl.crm.find + crmID)
      .pipe(
        tap((response: any) => {
          if (response.status === 'SUCCESS') {
            this.toastr.success('CRM loaded successfully!', 'Success');
          }
          console.log(response);
        }),
        map((response: any) => {
          return this.crmService.convertToCrmFromCrmDto(response.responseObject);
        }),
        catchError(this.handleError<CustomerRelation>('getCustomerRelations', new CustomerRelation()))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<{}> {
    const url = `${applicationUrl.crm.delete}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateCrmData(crmData: CustomerRelation, crmId: number): Observable<CustomerRelation> {
    return this.http.put<any>(applicationUrl.crm.update, this.crmService.convertToCrmDto(crmData, crmId))
      .pipe(tap((response: any) => {
        if (response.status === 'SUCCESS') {
          this.toastr.success('CRM information updated successfully!', 'Success');
        }
        console.log(response);
      }), map((response: any) => {
        return crmData;
      }), catchError(this.handleError('updateCrmData', crmData))
      );
  }
}
