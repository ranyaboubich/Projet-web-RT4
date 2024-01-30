import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/Decorators/user.decorator';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async findByBookNameAndAuthor(
    title: string,
    author: string,
  ): Promise<Review[]> {
    return this.reviewsRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.book', 'book')
      .innerJoinAndSelect('review.user', 'user')
      .where('book.title = :title', { title })
      .andWhere('book.author = :author', { author })
      .getMany();
  }
}
