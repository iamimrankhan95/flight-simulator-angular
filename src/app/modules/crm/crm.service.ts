import { Injectable } from '@angular/core';
import { CustomerRelation, AddressType } from '../../shared/models/customer-relation.model';
import { CrmDto } from '../../shared/models/dto/crm-dto';
import { AppService } from '../../app.service';
import { NgbDateCustomParserFormatter } from '../../shared/modules/shared/pipes/date-fomatter';
import { Address } from '../../shared/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class CRMService {
  selectedCrmId: number;

  constructor(private parserFormatter: NgbDateCustomParserFormatter) { }

  convertToCrmDto(crm: CustomerRelation, id: number): CrmDto {
    let crmDto = new CrmDto();
    crmDto.accusedOrganizationAddress = crm.accusedOrganizationAddress;
    crmDto.accusedOrganizationName = crm.accusedOrganizationName;
    crmDto.agentid = 1;
    crmDto.applicationTypeId = 1;
    crmDto.complainantAddress = crm.complainantAddress;
    crmDto.complaintName = crm.compliantName;
    crmDto.contactNo = crm.contactNo;
    crmDto.dob = this.parserFormatter.format(crm.dob);
    crmDto.email = crm.email;
    crmDto.fatherOrHusbandName = crm.fatherOrHusbandName;
    crmDto.genderId = crm.gender;
    crmDto.complainDate = this.parserFormatter.format({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }),
      crmDto.isHusband = crm.isHusband ? 1 : 0;
    crmDto.motherName = crm.motherName;
    crmDto.msisdn = crm.msisdn;
    crmDto.nidNumber = crm.nidNumber;
    crmDto.occupation = crm.occupation;
    crmDto.problemDescription = crm.problemDescription;
    crmDto.ticketStatusId = crm.ticketStatus;
    crmDto.departmentId = 1;
    crmDto.usersId = 1;
    crmDto.companyId = 1;
    crmDto.id = id;
    crmDto.uniqueId = crm.uniqueid;
    return crmDto;
  }

  convertToCrmFromCrmDto(crmDto: CrmDto): CustomerRelation {
    let crm = new CustomerRelation();
    crm.id = crmDto.id;
    crm.accusedOrganizationAddress = crmDto.accusedOrganizationAddress;
    crm.accusedOrganizationAddress.permanentAddressForm = new Address();
    crm.accusedOrganizationName = crmDto.accusedOrganizationName;
    crm.agentId = 1;
    crm.uniqueid = crmDto.uniqueId;
    crm.applicationType = 1;
    crm.complainantAddress = crmDto.complainantAddress;
    crm.compliantName = crmDto.complaintName;
    crm.contactNo = crmDto.contactNo;
    // crm.dob = this.parserFormatter.format(crmDto.dob);
    crm.email = crmDto.email;
    crm.fatherOrHusbandName = crmDto.fatherOrHusbandName;
    crm.gender = crmDto.genderId;
    //crm.complainDate = this.parserFormatter.format({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }),
    crm.isHusband = crmDto.isHusband === 1 ? true : false;
    crm.motherName = crmDto.motherName;
    crm.msisdn = crmDto.msisdn;
    crm.nidNumber = crmDto.nidNumber;
    crm.occupation = crmDto.occupation;
    crm.problemDescription = crmDto.problemDescription;
    crm.ticketStatus = crmDto.ticketStatusId;
    return crm;
  }
}
