import { Division } from './division.model';
import { District } from './district.model';
import { Thana } from './thana.model';
import { PostOffice } from './post-office.model';

export class Address {
  id?: number;
  address?: string;
  divisionId?: number;
  districtId?: number;
  thanaId?: number;
  postOfficeId?: number;
  constructor(
  ) { }
}
