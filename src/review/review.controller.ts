import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
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
