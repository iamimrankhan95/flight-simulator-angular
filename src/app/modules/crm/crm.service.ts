import { Injectable } from '@angular/core';
import { CustomerRelation } from '../../shared/models/customer-relation.model';
import { CrmDto } from '../../shared/models/dto/crm-dto';

@Injectable({
  providedIn: 'root'
})
export class CRMService {

  constructor() { }

  convertToCrmOtp(crm: CustomerRelation) {
    let crmDto: CrmDto;
    crmDto.accusedOrganizationAddress = crm.accusedOrganizationAddress;
    crmDto.accusedOrganizationName = crm.accusedOrganizationName;
    crmDto.agentid = crm.agentId;
    crmDto.applicationTypeId = crm.applicationType;
    crmDto.complainantAddress = crm.complainantAddress;
    crmDto.complaintName = crm.compliantName;
    crmDto.contactNo = crm.contactNo;
    crmDto.dob = crm.dob;
    crmDto.email = crm.email;
    crmDto.fatherOrHusbandName = crm.maritalStatus === 'married' ? crm.spouseName : crm.fatherName;
    crmDto.genderId = crm.gender === 'male' ? 1 : 2;
    crmDto.id = crm.id;
    crmDto.isHusband = crm.maritalStatus === 'married' ? true : false;
    crmDto.motherName = crm.motherName;
    crmDto.msisdn = crm.msisdn;
    crmDto.nidNumber = crm.nidNumber;
    crmDto.occupation = crm.occupation;
    crmDto.problemDescription = crm.problemDescription;
    crmDto.ticketStatusId = 1;
    crmDto.uniqueId = crm.uniqueid;
    return crmDto;
  }
}
