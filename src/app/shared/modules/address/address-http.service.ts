import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { applicationUrl } from '../../enums/application-urls';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DivisionDto } from '../../models/dto/division-dto.model';
import { DistrictDto } from '../../models/dto/district-dto.model';
import { ThanaDto } from '../../models/dto/thana-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AddressHttpService {

  private handleError: HandleError;
  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { this.handleError = httpErrorHandler.createHandleError('CRMHttpService'); }

  getDivisions(): Observable<DivisionDto[]> {
    return this.http.get<DivisionDto[]>(applicationUrl.division.dummyData)
      .pipe(
        tap((Response: DivisionDto[]) => console.log(Response)),
        catchError(this.handleError('getDivisions', []))
      );
  }

  getDistricts(): Observable<DistrictDto[]> {
    return this.http.get<DistrictDto[]>(applicationUrl.district.dummyData)
      .pipe(
        tap((Response: DistrictDto[]) => console.log(Response)),
        catchError(this.handleError('getDistricts', []))
      );
  }

  getThanas(): Observable<ThanaDto[]> {
    return this.http.get<ThanaDto[]>(applicationUrl.thana.dummyData)
      .pipe(
        tap((Response: ThanaDto[]) => console.log(Response)),
        catchError(this.handleError('getThanas', []))
      );
  }
}
