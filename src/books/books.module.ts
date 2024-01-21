import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Book } from './entities/book.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { WaitingList } from '../reservation/entities/waitingList.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([WaitingList]),],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
