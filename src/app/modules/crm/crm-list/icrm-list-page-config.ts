import { IPageConfig } from '../../../shared/models/ipage-config';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface ICRMListPageConfig extends IPageConfig {
  ticketNo?: any;
  fromDate?: any;
  toDate?: any;
  mobileNo?: any;
  status?: any;
  divisionId?: any;
  districtId?: any;
  upazilaId?: any;
}
