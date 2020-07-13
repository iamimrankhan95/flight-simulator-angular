import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './shared/services/http-error-handler.service';
import { AppService } from './app.service';
import { DivisionDto } from './shared/models/dto/division-dto.model';
import { applicationUrl } from './shared/enums/application-urls';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DistrictDto } from './shared/models/dto/district-dto.model';
import { ThanaDto } from './shared/models/dto/thana-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('AppHttpService')
  }

  getDivisions(): Observable<DivisionDto[]> {
    return this.http.get<any>(applicationUrl.division.read, {
      observe: 'body'
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      }),
      catchError(this.handleError('getDivisions', []))
    );
  }

  getDistricts(): Observable<DistrictDto[]> {
    return this.http.get<any>(applicationUrl.district.read, {
      observe: 'body'
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      }),
      catchError(this.handleError('getDivisions', []))
    );
  }

  getThanas(): Observable<ThanaDto[]> {
    return this.http.get<any>(applicationUrl.thana.read, {
      observe: 'body'
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      }),
      catchError(this.handleError('getDivisions', []))
    );
  }

  getDistrictsByDivisionId(divisionId): Observable<DistrictDto[]> {
    let params = new HttpParams()
      .set('id', (divisionId));

    return this.http.get<any>(applicationUrl.district.readByDivisionId, {
      observe: 'body',
      params: params
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      }),
      catchError(this.handleError('getDistrictsByDivisionId', []))
    );
  }

  getThanasByDistrictsId(districtId): Observable<ThanaDto[]> {
    let params = new HttpParams()
      .set('id', (districtId));

    return this.http.get<any>(applicationUrl.thana.readByDistrictId, {
      observe: 'body',
      params: params
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      }),
      catchError(this.handleError('getThanasByDistrictsId', []))
    );
  }

}
