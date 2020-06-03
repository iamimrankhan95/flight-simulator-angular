import { IAddress } from './address.model';


export interface IPostOffice {
  id?: number;
  name?: string;
  code?: string;
  addresses?: IAddress[];
}

export class PostOffice implements IPostOffice {
  constructor(public id?: number, public name?: string, public code?: string, public addresses?: IAddress[]) {}
}
