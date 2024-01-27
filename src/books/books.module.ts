import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { WaitingList } from '../reservation/entities/waitingList.entity';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([WaitingList]),
    ReviewModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
