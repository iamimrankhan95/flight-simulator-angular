import { IPageConfig } from '../../../shared/models/ipage-config';

export interface ICRMListPageConfig extends IPageConfig {
  ticketNo?: string;
  fromDate?: string;
  toDate?: string;
  mobileNo?: string;
  status?: string;
  divisionId?: number;
  districtId?: number;
  upazilaId?: number;
}
