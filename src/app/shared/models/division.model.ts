import { IAddress } from './address.model';


export interface IDivision {
  id?: number;
  name?: string;
  addresses?: IAddress[];
}

export class Division implements IDivision {
  constructor(public id?: number, public name?: string, public addresses?: IAddress[]) {}
}
