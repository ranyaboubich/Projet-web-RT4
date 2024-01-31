import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/Decorators/user.decorator';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(user, bookId, createReviewDto)  {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    const review = this.reviewsRepository.create({
      ...createReviewDto,
      user,
      book,
    });
   await this.reviewsRepository.save(review);
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
