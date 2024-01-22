import { Injectable } from '@nestjs/common';
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
      throw new Error("You're already in the waiting list");
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

  findAll(user): Promise<Reservation[]> {
    if(user.isAdmin){
      return this.reservationRepository.find({ relations: ['book', 'user'] });
    }
    return this.reservationRepository.find({ where: { user: user }, relations: ['book', 'user'] });
  }

  findOne(id: number, user): Promise<Reservation> {
    if(user.isAdmin){
      return this.reservationRepository.findOne({ where:{ id: id }, relations: ['book', 'user'] });
    }
    return this.reservationRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<string> {
    await this.reservationRepository.delete(id);
    return `La réservation d' id ${id} est supprimée`;
  }
}
