import Parse from 'parse';
import { ILoginInput, IUser, IUserInput } from '../types/user.type';
import { setValues } from '../utils/utils';
import { PATH_NAMES } from '../utils/constants';

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
    return Promise.reject(error);
  }
}

export const logout = async (): Promise<void> => {
  try {
    await Parse.User.logOut()

    console.log('logged Out',);
  } catch (error) {
    console.log(' ------ logout error: ', error);
    return Promise.reject(error);
  }
}

export const login = async (values: ILoginInput): Promise<void> => {
  try {
    const loggedInUser = await Parse.User.logIn(values.email, values.password);
    if (!loggedInUser) {
      throw new Error('No account found');
    }
  
    const currentUser =  await Parse.User.currentAsync();

    if (!currentUser || !currentUser.getSessionToken()) {
      throw new Error('Loggin failed');
    }

    console.log('logged in currentUser: ', currentUser.toJSON());
  } catch (error) {
    console.log(' ------ login error: ', error);
    return Promise.reject(error);
  }
}

// TODO: change to IUser later
export const getCurrentUser = async (): Promise<Record<string, any> | null | undefined> => {
  try {
    const user = await Parse.User.currentAsync();

    if (!user) {
      throw new Error('No user found');
    }
    // console.log('current user: ', user?.toJSON());

    return user.toJSON();
  } catch (error) {
    console.log(' ------ getCurrentUser error: ', error);
    return Promise.reject(error);
  }
}

export const deleteMyAccount = async (): Promise<Parse.User | null | undefined> => {
  try {
    const user = await Parse.User.currentAsync();
    user?.destroy()

    return user;
  } catch (error) {
    console.log(' ------ deleteMyAccount error: ', error);
    return Promise.reject(error);
  }
}

export const goToLogin = () => '/' + PATH_NAMES.auth.login;
