export interface IArticle extends Parse.Object {
  title: string;
}

export interface IArticleInput extends Pick<IArticle, 'title'> {}