import { Injectable } from '@angular/core';
import { DivisionDto } from './shared/models/dto/division-dto.model';
import { Observable, Observer } from 'rxjs';
import { AppHttpService } from './app-http.service';
import { DistrictDto } from './shared/models/dto/district-dto.model';
import { ThanaDto } from './shared/models/dto/thana-dto.model';
import { CompanyDto } from './shared/models/dto/company-dto';
import { DepartmentDto } from './shared/models/dto/department-dto';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  divisions: DivisionDto[] = [];
  districts: DistrictDto[] = [];
  thanas: ThanaDto[] = [];
  filteredDistrictListByDivisionId: DistrictDto[];
  filteredThanaListByDistrictId: ThanaDto[];
  companies: CompanyDto[] = [];
  departments: DepartmentDto[] = [];
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

  getDistrictsByDivisionId(divisionId): Observable<DistrictDto[]> {
    return new Observable((observer: Observer<DistrictDto[]>) => {
      // if (this.districts.length > 0) {
      //   observer.next(this.districts);
      // } else {
      this.appHttpService.getDistrictsByDivisionId(divisionId).subscribe(
        (districts: DistrictDto[]) => {
          this.filteredDistrictListByDivisionId = districts;
          observer.next(this.filteredDistrictListByDivisionId);
        }
      );
      // }
    });
  }

  getThanasByDistrictsId(districtId): Observable<ThanaDto[]> {
    return new Observable((observer: Observer<ThanaDto[]>) => {
      // if (this.thanas.length > 0) {
      //   observer.next(this.thanas);
      // } else {
      this.appHttpService.getThanasByDistrictsId(districtId).subscribe(
        (thanas: ThanaDto[]) => {
          this.filteredThanaListByDistrictId = thanas;
          observer.next(this.filteredThanaListByDistrictId);
        }
      );
      // }
    });
  }

  getCompanies(): Observable<CompanyDto[]> {
    return new Observable((observer: Observer<CompanyDto[]>) => {
      if (this.companies.length > 0) {
        observer.next(this.companies);
      } else {
        this.appHttpService.getCompanies().subscribe(
          (companies: CompanyDto[]) => {
            this.companies = companies;
            observer.next(this.companies);
          }
        );
      }
    });
  }

  getDepartments(): Observable<DepartmentDto[]> {
    return new Observable((observer: Observer<DepartmentDto[]>) => {
      if (this.departments.length > 0) {
        observer.next(this.departments);
      } else {
        this.appHttpService.getDepartments().subscribe(
          (departments: DepartmentDto[]) => {
            this.departments = departments;
            observer.next(this.departments);
          }
        );
      }
    });
  }
}
