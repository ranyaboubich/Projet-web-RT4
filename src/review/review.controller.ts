import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findByBookNameAndAuthor(
    @Query('name') name: string,
    @Query('author') author: string,
  ) {
    return this.reviewsService.findByBookNameAndAuthor(name, author);
  }
}
