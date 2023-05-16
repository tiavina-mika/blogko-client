import Parse from 'parse';

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
export const createArticle = async (values: IArticleInput): Promise<IArticle | undefined> => {
  try {
    const article = new Article();
    article.set('title', values.title);
    const newArticle = await article.save();

    return newArticle.toJSON();
  } catch (error) {
    console.log(' ------ createArticle error: ', error);
    return Promise.reject(error);
  }
}

export const updateArticle = async (id: string, values: IArticleInput): Promise<IArticle | undefined> => {
  try {
    const article = await queryArticle(id);

    if (!article) return;
  
    article.set('title', values.title);
    const updatedArticle = await article.save();

    return (updatedArticle as Parse.Attributes).toJSON();
  } catch (error) {
    console.log('updateArticle error: ', error);
    return Promise.reject(error);
  }
}

export const deleteArticle = async (id: string): Promise<string | undefined> => {
  try {
    const article = await queryArticle(id);
    if (!article) return;
  
    await article.destroy();
    return id;
  } catch (error) {
    console.log('deleteArticle error: ', error);
    return Promise.reject(error);
  }
}

export const getArticles = async (): Promise<IArticle[]> => {
  try {
    const articles = (await new Parse.Query(Article)
    .include(['user', 'category'])
    .find()) || [];
  
    // console.log(articles[0].toJSON().category.name);
    return articles.map((article: any) => article.toJSON())
  } catch (error) {
    console.log('getArticles error: ', error);
    return Promise.reject(error)
  }
}

export const getArticle = async (id: string): Promise<IArticle | undefined> => {
  try {
    const article = await queryArticle(id);
  
    console.log(' ------ getArticle articles: ', article);
    if(!article) return;

    return (article as Parse.Attributes).toJSON();
  } catch (error) {
    console.log('getArticle error: ', error);
    return Promise.reject(error);
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
    return Promise.reject(error);
  }
}

export const goToArticles = () => '/' + PATH_NAMES.articles.root;
export const gotoArticle = (id: string) => `/${PATH_NAMES.articles.root}/${id}`;
export const goToArticleCreation = () => `/${PATH_NAMES.articles.root}/${PATH_NAMES.articles.create}`;
export const goToArticleEdition = (id: string) => `/${PATH_NAMES.articles.root}/${PATH_NAMES.articles.edit}/${id}`;