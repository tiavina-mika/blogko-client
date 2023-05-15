import { z } from "zod";

import { articleSchema } from "../utils/vaildations/article.validations";
import { Attributes } from "parse";

export interface IArticle extends Attributes {
  objectId: string;
  title: string;
}

export type IArticleInput = z.infer<typeof articleSchema>;
