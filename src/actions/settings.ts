import Parse from 'parse';


export const cleanDatabase = async (): Promise<void> => {
  try {
    await Parse.Cloud.run('cleanDatabase');
    console.log(' ------ database cleaned: ');
  } catch (error) {
    console.log(' ------ cleanDatabase error: ', error);
  }
}
