import Parse from 'parse';

import { IArticleInput } from "../types/article.type";

const Article = Parse.Object.extend("Article");

export const createArticle = async (values: IArticleInput) => {
  try {
    const article = new Article();
    article.set('title', values.title);
    const newArticle = await article.save();
    console.log('newArticle: ', newArticle);
  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}

export const updateArticle = async (id: string, values: IArticleInput) => {
  try {
    const article = await new Parse.Query(Article)
      .equalTo('objectId', id)
      .first();

    if (!article) {
      throw Error('No Article found')
    }
  
    article.set('title', values.title);
    const newArticle = await article.save();
    console.log(' ------ updateArticle newArticle: ', newArticle);
  } catch (error) {
    console.log('updateArticle error: ', error);
  }
}

export const deleteArticle = async (id: string) => {
  try {
    const article = await new Parse.Query(Article)
      .equalTo('objectId', id)
      .first();

    if (!article) {
      throw Error('No Article found')
    }
  
    const newArticle = await article.destroy();
    console.log(' ------ deleteArticle newArticle: ', newArticle);
  } catch (error) {
    console.log('deleteArticle error: ', error);
  }
}