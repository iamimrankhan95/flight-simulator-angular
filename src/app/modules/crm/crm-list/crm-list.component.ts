import { Component, OnInit } from '@angular/core';
import { CustomerRelation } from '../../../shared/models/customer-relation.model';
import { CRMHttpService } from '../crm-http.service';

@Component({
  selector: 'app-crm-list',
  templateUrl: './crm-list.component.html',
  styleUrls: ['./crm-list.component.css']
})
export class CrmListComponent implements OnInit {

  error: any;
  customerRelations: CustomerRelation[];
  filterQuery = '';
  constructor(private crmHttpService: CRMHttpService) {
    this.crmHttpService.getCustomerRelations()
      .subscribe(
        (customerRelations: CustomerRelation[]) => {
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


  ngOnInit(): void {
  }

}
