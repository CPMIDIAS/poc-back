import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { FindOneParams } from '../../utils/find-one-params';
import { CreateArticleDto } from '../../infrastructure/dtos/article/create-article.dto';
import { UpdateArticleDto } from '../../infrastructure/dtos/article/update-article.dto';
import { RequestWithUser } from '../authentication/request-with-user';
import { ArticleService } from './article.service';

@Controller('articles')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: RequestWithUser,
  ) {
    return this.articleService.create(createArticleDto, req.user);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.articleService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param() { id }: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(Number(id), updateArticleDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.articleService.remove(Number(id));
  }
}
