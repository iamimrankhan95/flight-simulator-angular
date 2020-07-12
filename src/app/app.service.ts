import { Injectable } from '@angular/core';
import { DivisionDto } from './shared/models/dto/division-dto.model';
import { Observable, Observer } from 'rxjs';
import { AppHttpService } from './app-http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  divisions: DivisionDto[] = [];

  constructor(
    private appHttpService: AppHttpService
  ) { }

  getLoggedInUser() {
  }

  getDivisions(): Observable<DivisionDto[]> {
    return new Observable((observer: Observer<DivisionDto[]>) => {
      if (this.divisions.length > 0) {
        observer.next(this.divisions);
      } else {
        this.appHttpService.getDivisions().subscribe(
          (divisions: DivisionDto[]) => {
            this.divisions = divisions;
            observer.next(this.divisions);
          }
        );
      }
    });
  }
}
