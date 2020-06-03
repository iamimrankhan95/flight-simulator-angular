import { IAddress } from './address.model';


export interface IThana {
  id?: number;
  name?: string;
  addresses?: IAddress[];
}

export class Thana implements IThana {
  constructor(public id?: number, public name?: string, public addresses?: IAddress[]) {}
}
