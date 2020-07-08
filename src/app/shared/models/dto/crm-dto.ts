import { AddressType } from '../customer-relation.model';


export class CrmDto {
  'accusedOrganizationAddress': AddressType;
  'accusedOrganizationName': string;
  'agentid': number;
  'applicationTypeId': number;
  'companyId': number;
  'complainDate': string;
  'complainantAddress': AddressType;
  'complaintName': string;
  'contactNo': string;
  'departmentId': number;
  'dob': string;
  'email': string;
  'fatherOrHusbandName': string;
  'genderId': number;
  'id': number;
  'isHusband': number;
  'motherName': string;
  'msisdn': string;
  'nidNumber': string;
  'occupation': string;
  'problemDescription': string;
  'ticketStatusId': number;
  'usersId': number;
}