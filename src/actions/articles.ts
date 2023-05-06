import Parse from 'parse';

import { IArticleInput } from "../types/article.type";

const Article = Parse.Object.extend("Article");

const queryArticle = async (id: string): Promise<Parse.Object | undefined>  => {
  const article = await new Parse.Query(Article)
  .equalTo('objectId', id)
  .first();

  if (!article) {
    throw Error('No Article found')
  }

  return article;
}
export const createArticle = async (values: IArticleInput) => {
  try {
    const article = new Article();
    article.set('title', values.title);
    const newArticle = await article.save();
    const newArticleJson = newArticle.toJSON()

    console.log('newArticleJson id: ', newArticleJson);

  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}

export const updateArticle = async (id: string, values: IArticleInput) => {
  try {
    const article = await queryArticle(id);

    if (!article) return;
  
    article.set('title', values.title);
    const newArticle = await article.save();
    console.log(' ------ updateArticle newArticle: ', newArticle);
  } catch (error) {
    console.log('updateArticle error: ', error);
  }
}

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const article = await queryArticle(id);
    if (!article) return;
  
    await article.destroy();
  } catch (error) {
    console.log('deleteArticle error: ', error);
  }
}

export const getArticles = async (): Promise<Parse.Object[] | undefined> => {
  console.log('hello');
  try {
    const articles = await new Parse.Query(Article)
      .find();
  
    console.log(' ------ getArticles articles: ', articles);
    return articles
  } catch (error) {
    console.log('getArticles error: ', error);
  }
}

export const getArticle = async (id: string): Promise<Parse.Object | undefined> => {
  try {
    const article = await queryArticle(id);
  
    console.log(' ------ getArticle articles: ', article);
    return article;
  } catch (error) {
    console.log('getArticle error: ', error);
  }
}

export const deleteAllArticles = async (): Promise<void> => {
  try {
    await new Parse.Query(Article)
      .each(async article => {
        await article.destroy()
      });

  
    console.log(' ------ deleteAllArticles: ');
  } catch (error) {
    console.log('getArticle error: ', error);
  }
}