import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { WaitingList } from './entities/waitingList.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(WaitingList)
    private waitingListRepository: Repository<WaitingList>,
  ) {}

  async reserveBook(bookId: number, userId: number) {
    const existingReservation = await this.reservationRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId } },
    });
    if (existingReservation) {
      throw new Error('Already reserved');
    }

    const existingWaitingList = await this.waitingListRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId } },
    });
    if (existingWaitingList) {
      throw new Error('Already in waiting list');
    }

    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (book.instances > 0) {
      book.instances -= 1;
      await this.booksRepository.save(book);
      const reservation = this.reservationRepository.create({
        book: { id: book.id }, // Pass the book object with the 'id' property
        user: { id: userId }, // Pass the user object with the 'id' property
        reservedAt: new Date(),
      });
      await this.reservationRepository.save(reservation);
    } else {
      const waitingList = this.waitingListRepository.create({
        book: { id: book.id }, // Pass the book object with the 'id' property
        user: { id: userId }, // Pass the user object with the 'id' property
        joinedAt: new Date(),
      });
      await this.waitingListRepository.save(waitingList);
    }
  }

  // create(createReservationDto: CreateReservationDto): Promise<Reservation> {
  //   const reservation = this.reservationRepository.create(createReservationDto);
  //   return this.reservationRepository.save(reservation);
  // }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
