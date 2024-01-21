import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { WaitingList } from './entities/waitingList.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([WaitingList]),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
