import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { Division } from '../../models/division.model';
import { applicationUrl } from '../../enums/application-urls';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { District } from '../../models/district.model';
import { Thana } from '../../models/thana.model';

@Injectable({
  providedIn: 'root'
})
export class AddressHttpService {

  private handleError: HandleError;
  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { this.handleError = httpErrorHandler.createHandleError('CRMHttpService'); }

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(applicationUrl.division.dummyData)
      .pipe(
        tap((Response: Division[]) => console.log(Response)),
        catchError(this.handleError('getDivisions', []))
      );
  }

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(applicationUrl.district.dummyData)
      .pipe(
        tap((Response: District[]) => console.log(Response)),
        catchError(this.handleError('getDistricts', []))
      );
  }

  getThanas(): Observable<Thana[]> {
    return this.http.get<Thana[]>(applicationUrl.thana.dummyData)
      .pipe(
        tap((Response: Thana[]) => console.log(Response)),
        catchError(this.handleError('getThanas', []))
      );
  }
}
