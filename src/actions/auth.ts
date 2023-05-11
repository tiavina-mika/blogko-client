import Parse from 'parse';
import { ILoginInput, IUserInput } from '../types/user';
import { setValues } from '../utils/utils';

const SIGNUP_PROPERTIES = new Set(['email', 'password', 'username', 'name']);

export const signUp = async (values: IUserInput): Promise<void> => {
  try {
    const user = new Parse.User();
    setValues(user, values, SIGNUP_PROPERTIES)

    const newUser = await user.signUp();
    console.log('signUp user id: ', newUser.toJSON());

    const roles = await Parse.Cloud.run('getRolesForUser');

    console.log('signUp roles: ', roles.map((role: Parse.Role) => role.toJSON()));

    await logout()
  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}

export const logout = async (): Promise<void> => {
  try {
    await Parse.User.logOut()

    console.log('logged Out',);
  } catch (error) {
    console.log(' ------ logout error: ', error);
  }
}

export const login = async (values: ILoginInput): Promise<Parse.User | undefined> => {
  try {
    const user = await Parse.User.logIn(values.email, values.password)
    console.log('logged in user: ', user.toJSON());

    return user;
  } catch (error) {
    console.log(' ------ login error: ', error);
  }
}

export const getCurrentUser = async (): Promise<Parse.User | null | undefined> => {
  try {
    const user = await Parse.User.currentAsync()
    console.log('current user: ', user?.toJSON());

    return user;
  } catch (error) {
    console.log(' ------ getCurrentUser error: ', error);
  }
}

export const deleteMyAccount = async (): Promise<Parse.User | null | undefined> => {
  try {
    const user = await Parse.User.currentAsync();
    user?.destroy()

    return user;
  } catch (error) {
    console.log(' ------ deleteMyAccount error: ', error);
  }
}