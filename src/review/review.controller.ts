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
import { User } from '../Decorators/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewsService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('id') bookId: number,
    @User() user
  ) {
    const userId = user.id;
    return this.reviewsService.create( user,bookId, createReviewDto);
  }

  @Get()
  findByBookNameAndAuthor(
    @Query('title') title: string,
    @Query('author') author: string,
  ) {
    return this.reviewsService.findByBookNameAndAuthor(title, author);
  }
}
