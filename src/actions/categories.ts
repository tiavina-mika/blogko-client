import Parse from 'parse';
import { ICategoryInput } from '../types/category.type';
import { createArticle } from './articles';

const Category = Parse.Object.extend("Category");

const queryCategory = async (id: string): Promise<Parse.Object | undefined>  => {
  const category = await new Parse.Query(Category)
  .equalTo('objectId', id)
  .first();

  if (!category) {
    throw Error('No Category found')
  }

  return category;
}
export const createCategory = async (values: ICategoryInput) => {
  try {  
    const category = new Category();
    category.set('name', values.name);
    const newCategory = await category.save();

    const newCategoryJson = newCategory.toJSON()

    const article = await createArticle({ title: 'Article 01' } as any);

    article?.set('category', newCategory)

    await article?.save();
  
    console.log('newCategoryJson id: ', newCategoryJson);

  } catch (error) {
    console.log(' ------ createCategory error: ', error);
  }
}

export const updateCategory = async (id: string, values: ICategoryInput) => {
  try {
    const category = await queryCategory(id);

    if (!category) return;
  
    category.set('name', values.name);
    const newCategory = await category.save();
    console.log(' ------ updateCategory newCategory: ', newCategory);
  } catch (error) {
    console.log('updateCategory error: ', error);
  }
}

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const category = await queryCategory(id);
    if (!category) return;
  
    await category.destroy();
  } catch (error) {
    console.log('deleteCategory error: ', error);
  }
}

export const getCategories = async (): Promise<Parse.Object[] | undefined> => {
  try {
    const categories = await new Parse.Query(Category)
      .find();

    console.log(' ------ getCategories categories: ', categories);
    return categories
  } catch (error) {
    console.log('getCategories error: ', error);
  }
}

export const getCategory = async (id: string): Promise<Parse.Object | undefined> => {
  try {
    const category = await queryCategory(id);
  
    console.log(' ------ getCategory categories: ', category);
    return category;
  } catch (error) {
    console.log('getCategory error: ', error);
  }
}

export const deleteAllCategories = async (): Promise<void> => {
  try {
    await new Parse.Query(Category)
      .each(async category => {
        await category.destroy()
      });

  
    console.log(' ------ deleteAllCategories: ');
  } catch (error) {
    console.log('getCategory error: ', error);
  }
}