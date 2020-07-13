import { Moment } from 'moment';
import { Address } from './address.model';

export class CustomerRelation {
  accusedOrganizationAddress: AddressType;
  accusedOrganizationName: string;
  agentId: number;
  applicationType: number;
  complainantAddress: AddressType;
  compliantName: string;
  contactNo: string;
  dob: any;
  email: string;
  fatherName: string;
  gender: string;
  id: number;
  isHusband: boolean;
  fatherOrHusbandName: string;
  maritalStatus: string;
  motherName: string;
  msisdn: string;
  nidNumber: string;
  occupation: string;
  problemDescription: string;
  spouseName: string;
  ticketStatus: string;
  uniqueid: string;
  constructor(
  ) {
  }
}

export class AddressType {
  presentAddressForm: Address;
  permanentAddressForm: Address;
}
