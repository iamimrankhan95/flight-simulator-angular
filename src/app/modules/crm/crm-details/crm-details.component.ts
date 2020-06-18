import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CRMHttpService } from '../crm-http.service';
import { CustomerRelation } from '../../../shared/models/customer-relation.model';

@Component({
  selector: 'app-crm-details',
  templateUrl: './crm-details.component.html',
  styleUrls: ['./crm-details.component.css']
})
export class CrmDetailsComponent implements OnInit {

  public crmID: number;
  public crm: any = [];
  public customerInfo: boolean = true;
  public accusedOrganizationInfo: boolean;

  constructor(
    private route: ActivatedRoute,
    private crmHttpService: CRMHttpService
  ) {
    this.crmID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.getCrmInfo();
  }

  getCrmInfo() {
    this.crmHttpService.getCustomerRelation(this.crmID).subscribe( response => {
      this.crm = response;
      console.log(response);
      console.log(this.crm);
    }, error => {
      console.log(error);
    });
  }
  selectCustomerInfo() {
    this.customerInfo = true;
    this.accusedOrganizationInfo = false;
  }

  selectAccusedOranizationInfo() {
    this.accusedOrganizationInfo = true;
    this.customerInfo = false;
  }

}
