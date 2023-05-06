export interface IUser extends Parse.User {
  email: string;
  password: string;
  name: string;
}

export interface IUserInput extends Pick<IUser, 'email' | 'password' | 'name'> {}