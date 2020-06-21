import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CustomerRelation } from '../../../shared/models/customer-relation.model';
import { CRMHttpService } from '../crm-http.service';
import { ICRMListPageConfig } from './icrm-list-page-config';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/modules/shared/pipes/date-fomatter';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-crm-list',
  templateUrl: './crm-list.component.html',
  styleUrls: ['./crm-list.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class CrmListComponent implements OnInit, OnDestroy {

  pageConfig: ICRMListPageConfig = {
    pageNo: 1,
    pageSize: 10,
    fromDate: null,
    toDate: null,
    mobileNo: null,
    ticketNo: '',
    status: null,
    divisionId: null,
    districtId: null,
    upazilaId: null,
    searchKey: null,
    searchBy: ''
  };
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  error: any;
  placeHolderForSearchKey = '';
  today = new Date();
  fromMinDate = { year: this.today.getFullYear() - 100, month: 1, day: 1 };
  fromMaxDate = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
  toMaxDate = { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
  @ViewChild('f') f: NgbInputDatepicker;
  @ViewChild('t') t: NgbInputDatepicker;
  customerRelations: CustomerRelation[];

  constructor(private crmHttpService: CRMHttpService) {
    console.log(this.today.getMonth());
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.pageConfig.pageSize,
      searching: false
    };

    this.crmHttpService.getCustomerRelations(this.pageConfig)
      .subscribe(
        (customerRelations: any) => {
          setTimeout(() => {
            this.customerRelations = [...customerRelations];
            this.dtTrigger.next();
          }, 1000);
        }, // success path
        error => this.error = error // error path
      );
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  onFromDateSelect(event: NgbDate, f: any) {
    this.pageConfig.toDate = null;
  }

  onToDateSelect(event: any) {
    this.crmHttpService.getCustomerRelations(this.pageConfig);
  }

  onEnter() {
    // this.pageConfig.currentPage = this.startPage;
    // this.navigationForAdmin();
  }

  onSearchChange(phone: string) {
    // if (phone === '') {
    //   this.pageConfig.currentPage = this.startPage;
    //   // this.navigationForAdmin();
    // }
  }

  onChangeSearchBy() {
    if (this.pageConfig.searchBy === 'mobileNo') {
      this.placeHolderForSearchKey = 'Enter Mobile Number.';
    } else {
      this.placeHolderForSearchKey = 'Enter Ticket Number.';
    }
  }
  public clearFilters(): void {
    // this.mytime = void 0;
  }

  public updateCrm(): void {
    // this.mytime = void 0;
  }

  public deleteCrm(): void {
    // this.mytime = void 0;
  }

  public assignCrm(): void {
    // this.mytime = void 0;
  }
  onFormDateChange(value) {
    if (value instanceof NgbDate === false) {
      this.pageConfig.fromDate = null;
      this.pageConfig.toDate = null;
    }
    this.pageConfig.toDate = null;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}