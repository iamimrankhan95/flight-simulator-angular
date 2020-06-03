import { IAddress } from './address.model';


export interface IDistrict {
  id?: number;
  name?: string;
  addresses?: IAddress[];
}

export class District implements IDistrict {
  constructor(public id?: number, public name?: string, public addresses?: IAddress[]) {}
}
