import { Attributes } from "parse";

export interface IUser extends Attributes {
  objectId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}