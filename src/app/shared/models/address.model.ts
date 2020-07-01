import { IDivision } from './division.model';
import { IDistrict } from './district.model';
import { IThana } from './thana.model';
import { IPostOffice } from './post-office.model';


export interface IAddress {
  id?: number;
  houseNo?: string;
  streetNo?: string;
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
  ) { }
}
