import { Moment } from 'moment';
import { IAddress } from './address.model';

export interface ICustomerRelation {
  id?: number;
  uniqueid?: string;
  agentId?: number;
  msisdn?: string;
  contactNo?: string;
  nidNumber?: string;
  compliantName?: string;
  email?: string;
  isHusbandName?: boolean;
  fatherName?: string;
  motherName?: string;
  dob?: Moment;
  occupation?: string;
  accusedOrganizationName?: string;
  accusedOrganizationAddress?: string;
  problemDescription?: string;
  permanentAddress?: IAddress;
  presentAddress?: IAddress;
}

export class CustomerRelation implements ICustomerRelation {
  constructor(
    public id?: number,
    public uniqueid?: string,
    public agentId?: number,
    public msisdn?: string,
    public contactNo?: string,
    public nidNumber?: string,
    public compliantName?: string,
    public email?: string,
    public isHusbandName?: boolean,
    public fatherName?: string,
    public motherName?: string,
    public dob?: Moment,
    public occupation?: string,
    public accusedOrganizationName?: string,
    public accusedOrganizationAddress?: string,
    public problemDescription?: string,
    public permanentAddress?: IAddress,
    public presentAddress?: IAddress
  ) {
    this.isHusbandName = this.isHusbandName || false;
  }
}
