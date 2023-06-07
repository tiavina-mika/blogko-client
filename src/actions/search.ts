import Parse from 'parse';

type ISearchUserFullName = {
  firstName?: string;
  lastName: string;
}
export const searchUserByFullName = async (values: ISearchUserFullName): Promise<void> => {
  try {
    // return json
    const users = await Parse.Cloud.run('searchUserByFullName', { ...values });
    console.log('searchUserByFullName users: ', users);

    return users
  } catch (error) {
    console.log('updateArticle error: ', error);
    return Promise.reject(error);
  }
}
