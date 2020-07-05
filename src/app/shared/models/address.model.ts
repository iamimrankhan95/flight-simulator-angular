import { Division } from './division.model';
import { IDistrict, District } from './district.model';
import { IThana, Thana } from './thana.model';
import { IPostOffice, PostOffice } from './post-office.model';


export interface IAddress {
  id?: number;
  houseNo?: string;
  streetNo?: string;
  division?: Division;
  district?: District;
  thana?: Thana;
  postOffice?: PostOffice;
  divisionId?: number;
  districtId?: number;
  thanaId?: number;
  postOfficeId?: number;
}

export class Address implements IAddress {
  constructor(
  ) { }
}
