import { getRepository } from "typeorm";
import { Article } from "../models";

export interface IArticlePayload {
  title: string;
  subtitle: string;
  content: string;
  userId: number;
}

export const getArticles = async (): Promise<Array<Article>> => {
  const articleRepository = getRepository(Article);
  return articleRepository.find();
};

export const createArticle = async (payload: IArticlePayload): Promise<Article> => {
  const articleRepository = getRepository(Article);
  const article = new Article();
  return articleRepository.save({
    ...article,
    ...payload,
  });
};

export const getArticle = async (id: number): Promise<Article | null> => {
  const articleRepository = getRepository(Article);
  const article = await articleRepository.findOne({ id: id });
  if (!article) return null;
  return article;
};
