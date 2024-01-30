import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findByBookNameAndAuthor(
    @Query('title') title: string,
    @Query('author') author: string,
  ) {
    return this.reviewsService.findByBookNameAndAuthor(title, author);
  }
}
