import { Attributes } from "parse";

export interface IUser extends Attributes {
  objectId: string;
  email: string;
  password: string;
  name: string;
}

export interface IUserInput extends Pick<IUser, 'email' | 'password' | 'name'> {}
export interface ILoginInput extends Pick<IUser, 'email' | 'password'> {}