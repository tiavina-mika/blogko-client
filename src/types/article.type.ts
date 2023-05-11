export interface IArticle extends Parse.Object {
  objectId: string;
  title: string;
}

export interface IArticleInput extends Pick<IArticle, 'title'> {}