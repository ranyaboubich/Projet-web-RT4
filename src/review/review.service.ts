import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async findByBookNameAndAuthor(
    name: string,
    author: string,
  ): Promise<Review[]> {
    return this.reviewsRepository
      .createQueryBuilder('review')
      .innerJoinAndSelect('review.book', 'book')
      .where('book.name = :name', { name })
      .andWhere('book.author = :author', { author })
      .getMany();
  }
}
