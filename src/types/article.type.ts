import { z } from "zod";

import { articleSchema } from "../utils/vaildations/article.validations";

export interface IArticle extends Parse.Object {
  objectId: string;
  title: string;
}

export type IArticleInput = z.infer<typeof articleSchema>;
