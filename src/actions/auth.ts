import Parse from 'parse';
import { IUserInput } from '../types/user';

export const signUp = async (values: IUserInput): Promise<Parse.Object | undefined> => {
  try {
    const user = new Parse.User();
    user.set('username', values.email);
    user.set('email', values.email);
    user.set('name', values.name);
    user.set('password', values.password);
    const newUser = await user.signUp();

    console.log('newUserJson id: ', newUser.toJSON());
    return newUser

  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}

export const logout = async (): Promise<void> => {
  try {
    await Parse.User.logOut()

    console.log('logget Out',);
  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}
