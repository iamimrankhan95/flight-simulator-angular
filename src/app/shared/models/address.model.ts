import { ICustomerRelation } from './customer-relation.model';
import { IDivision } from './division.model';
import { IDistrict } from './district.model';
import { IThana } from './thana.model';
import { IPostOffice } from './post-office.model';


export interface IAddress {
  id?: number;
  houseNo?: string;
  streetNo?: string;
  permanentCustomRelations?: ICustomerRelation[];
  presentCustomRelations?: ICustomerRelation[];
  division?: IDivision;
  district?: IDistrict;
  thana?: IThana;
  postOffice?: IPostOffice;
  divisionId?: number;
  districtId?: number;
  thanaId?: number;
  postOfficeId?: number;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public houseNo?: string,
    public streetNo?: string,
    public permanentCustomRelations?: ICustomerRelation[],
    public presentCustomRelations?: ICustomerRelation[],
    public division?: IDivision,
    public district?: IDistrict,
    public thana?: IThana,
    public postOffice?: IPostOffice
  ) { }
}
