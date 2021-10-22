import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../domain/entities/article.entity';
import { User } from '../../domain/entities/user.entity';
import { CreateArticleDto } from '../../infrastructure/dtos/article/create-article.dto';
import { UpdateArticleDto } from '../../infrastructure/dtos/article/update-article.dto';
import ArticleNotFoundException from './exception/articleNotFound.exception';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(article: CreateArticleDto, user: User) {
    const newArticle = await this.articlesRepository.create({
      ...article,
      author: user,
    });
    await this.articlesRepository.save(newArticle);
    return newArticle;
  }

  findAll() {
    return this.articlesRepository.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOne(id, {
      relations: ['author'],
    });
    if (article) return article;
    throw new ArticleNotFoundException(id);
  }

  async update(id: number, article: UpdateArticleDto) {
    await this.articlesRepository.update(id, article);
    const updatedArticle = await this.articlesRepository.findOne(id, {
      relations: ['author'],
    });
    if (updatedArticle) return updatedArticle;
    throw new ArticleNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.articlesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new ArticleNotFoundException(id);
    }
  }
}
