import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Article } from "../models";
import {
  createArticle,
  getArticles,
  IArticlePayload,
  getArticle,
} from "../repositories/article.repository";

@Route("articles")
@Tags("Article")
export default class ArticleController {
  @Get("/")
  public async getArticles(): Promise<Array<Article>> {
    return getArticles();
  }

  @Post("/")
  public async createArticle(@Body() body: IArticlePayload): Promise<Article> {
    return createArticle(body);
  }

  @Get("/:id")
  public async getArticle(@Path() id: string): Promise<Article | null> {
    return getArticle(Number(id));
  }
}
