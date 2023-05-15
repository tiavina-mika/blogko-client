import Parse, { Attributes } from 'parse';

import { IArticle, IArticleInput } from "../types/article.type";
import { PATH_NAMES } from '../utils/constants';

const Article = Parse.Object.extend("Article");

const queryArticle = async (id: string): Promise<Parse.Object | undefined>  => {
  const article = await new Parse.Query(Article)
  .equalTo('objectId', id)
  .include(['user', 'category'])
  .first();

  if (!article) {
    throw Error('No Article found')
  }

  return article;
}
export const createArticle = async (values: IArticleInput): Promise<Parse.Object | undefined> => {
  try {
    const article = new Article();
    article.set('title', values.title);
    const newArticle = await article.save();

    console.log('newArticleJson id: ', newArticle.toJSON());
    return newArticle

  } catch (error) {
    console.log(' ------ createArticle error: ', error);
  }
}

export const updateArticle = async (id: string, values: IArticleInput): Promise<Parse.Object | undefined> => {
  try {
    const article = await queryArticle(id);

    if (!article) return;
  
    article.set('title', values.title);
    const newArticle = await article.save();
    console.log(' ------ updateArticle newArticle: ', newArticle);
    return newArticle
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

export const getArticles = async (toJson = true): Promise<Parse.Object[] | IArticle[] | undefined> => {
  try {
    const articles = await new Parse.Query(Article)
      .include(['user', 'category'])
      .find();
  
    // console.log(articles[0].toJSON().category.name);
    if (toJson) {
      return articles.map((article: any) => article.toJSON())
    }

    return articles
  } catch (error) {
    console.log('getArticles error: ', error);
  }
}

export const getArticle = async (id: string, toJson = false): Promise<IArticle | Parse.Object | undefined> => {
  try {
    const article = await queryArticle(id);
  
    console.log(' ------ getArticle articles: ', article);
    if(!article) return;
    return toJson ? (article as any).toJSON(): article;
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

export const goToArticles = () => '/' + PATH_NAMES.articles.root;
export const gotoArticle = (id: string) => `/${PATH_NAMES.articles.root}/${id}`;
export const goToArticleCreation = () => `/${PATH_NAMES.articles.root}/${PATH_NAMES.articles.create}`;
export const goToArticleEdition = (id: string) => `/${PATH_NAMES.articles.root}/${PATH_NAMES.articles.edit}/${id}`;