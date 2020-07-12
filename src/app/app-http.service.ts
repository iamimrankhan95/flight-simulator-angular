import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from './shared/services/http-error-handler.service';
import { AppService } from './app.service';
import { DivisionDto } from './shared/models/dto/division-dto.model';
import { applicationUrl } from './shared/enums/application-urls';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
  }

  getDivisions(): Observable<any[]> {
    return this.http.get<any>(applicationUrl.division.read, {
      observe: 'body'
    }).pipe(
      map((response: any) => {
        console.log(response);
        return response.responseList;
      })
    );
  }

}
