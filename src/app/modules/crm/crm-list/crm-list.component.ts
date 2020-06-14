import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CrmListComponent implements OnInit {

  pageConfig: ICRMListPageConfig;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  error: any;
  placeHolderForSearchKey = '';
  minDate = { year: new Date().getFullYear() - 100, month: 1, day: 1 };
  maxDate = { year: new Date().getFullYear() + 100, month: 1, day: 1 };
  fromDatePlaceHolder = 'dd/mm/yyyy';
  toDatePlaceHolder = 'dd/mm/yyyy';
  @ViewChild('f') f: NgbInputDatepicker;
  @ViewChild('t') t: NgbInputDatepicker;
  itemsPerPage = 5;
  startPage = 1;
  customerRelations: CustomerRelation[];
  filterQuery = '';
  constructor(private crmHttpService: CRMHttpService) {
    this.pageConfig = {
      pageNo: this.startPage,
      pageSize: this.itemsPerPage,
      fromDate: '',
      toDate: '',
      mobileNo: null,
      ticketNo: '',
      status: null,
      divisionId: null,
      districtId: null,
      upazilaId: null,
      searchKey: null,
      searchBy: ''
    };
    this.crmHttpService.getCustomerRelations(this.pageConfig)
      .subscribe(
        (customerRelations: any) => {
          setTimeout(() => {
            this.customerRelations = [...customerRelations];
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
    // this.pageConfig.currentPage = this.startPage;
    // this.pageConfig.fromDate = event.day + '/' + event.month + '/' + event.year;
    // this.navigationForAdmin();
  }

  onToDateSelect(event: any) {
    this.crmHttpService.getCustomerRelations(this.pageConfig)
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

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  onChangeSearchBy() {
    if (this.pageConfig.searchBy === 'mobileNo') {
      this.placeHolderForSearchKey = 'Enter Mobile Number.'
    } else {
      this.placeHolderForSearchKey = 'Enter Ticket Number.'
    }
  }
  public clearFilters(): void {
    // this.mytime = void 0;
  }
  onFormDateChange(value) {
    if (value instanceof NgbDate === false) {
      this.pageConfig.fromDate = null;
      this.pageConfig.toDate = null;
    }
  }
}
