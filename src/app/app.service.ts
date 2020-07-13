import { Injectable } from '@angular/core';
import { DivisionDto } from './shared/models/dto/division-dto.model';
import { Observable, Observer } from 'rxjs';
import { AppHttpService } from './app-http.service';
import { DistrictDto } from './shared/models/dto/district-dto.model';
import { ThanaDto } from './shared/models/dto/thana-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  divisions: DivisionDto[] = [];
  districts: DistrictDto[] = [];
  thanas: ThanaDto[] = [];

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

  getDistricts(): Observable<DistrictDto[]> {
    return new Observable((observer: Observer<DistrictDto[]>) => {
      if (this.districts.length > 0) {
        observer.next(this.districts);
      } else {
        this.appHttpService.getDistricts().subscribe(
          (districts: DistrictDto[]) => {
            this.districts = districts;
            observer.next(this.districts);
          }
        );
      }
    });
  }

  getThanas(): Observable<ThanaDto[]> {
    return new Observable((observer: Observer<ThanaDto[]>) => {
      if (this.thanas.length > 0) {
        observer.next(this.thanas);
      } else {
        this.appHttpService.getThanas().subscribe(
          (thanas: ThanaDto[]) => {
            this.thanas = thanas;
            observer.next(this.thanas);
          }
        );
      }
    });
  }
}
