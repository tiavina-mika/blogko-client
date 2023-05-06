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

export const getArticles = async (): Promise<Parse.Object[] | undefined> => {
  try {
    const articles = await new Parse.Query(Article)
      .include()
      .find();

      
    const total = await Parse.Cloud.run('numbersSum', { a: 1, b: 9 })
    console.log('total: ', total);
  
    // console.log(' ------ getArticles articles: ', articles.map((article) => article.toJSON()));
    console.log(articles[0].toJSON().category.name);
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