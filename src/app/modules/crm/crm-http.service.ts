import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { applicationUrl } from '../../shared/enums/application-urls';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../shared/services/http-error-handler.service';
import { CustomerRelation } from '../../shared/models/customer-relation.model';
import { ICRMListPageConfig } from './crm-list/icrm-list-page-config';
import { CRMService } from './crm.service';

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
    private crmService: CRMService
  ) {
    this.handleError = httpErrorHandler.createHandleError('CRMHttpService');
  }

  /** GET heroes from the server */
  getCustomerRelations(pageConfig: ICRMListPageConfig): Observable<any[]> {
    const params = this.constructParam(pageConfig);
    return this.http.get<any[]>(applicationUrl.crm.dummyData, { params })
      .pipe(
        tap((Response) => console.log(Response)),
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
    return this.http.post<CustomerRelation>(applicationUrl.crm.create, this.crmService.convertToCrmDto(customerRelation), httpOptions)
      .pipe(
        catchError(this.handleError('addCustomerRelation', customerRelation))
      );
  }

  // Get information on specific crm
  getCustomerRelation(crmID: number) {
    const tempUrl = applicationUrl.crm.find + '/' + crmID;
    return this.http.get<any>(tempUrl, httpOptions);
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
  updateHero(hero: CustomerRelation): Observable<CustomerRelation> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<CustomerRelation>(applicationUrl.crm.update, hero, httpOptions)
      .pipe(
        catchError(this.handleError('updateHero', hero))
      );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
