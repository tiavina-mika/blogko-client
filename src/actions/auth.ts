import Parse from 'parse';
import { ILoginInput, IUserInput } from '../types/user';

export const signUp = async (values: IUserInput): Promise<void> => {
  try {
    const user = new Parse.User();
    user.set('username', values.email);
    user.set('email', values.email);
    user.set('name', values.name);
    user.set('password', values.password);
    const newUser = await user.signUp();
    console.log('newUserJson id: ', newUser.toJSON());

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