import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { WaitingList } from 'src/reservation/entities/waitingList.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(WaitingList)
    private waitingListRepository: Repository<WaitingList>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return this.booksRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<void> {
    await this.booksRepository.update(id, updateBookDto);
    if (updateBookDto.instances) {
      //get waitinglist sorted by joinedAt limited by the number of instances

      const waitingList = await this.waitingListRepository.find({
        where: { book: { id: id } },
        order: { joinedAt: 'ASC' },
        take: updateBookDto.instances,
      });

      console.log('je suis la waitingList',waitingList)
      const allWaitingListItems = await this.waitingListRepository.find();
      console.log('je suis la allwaitingList',allWaitingListItems)
      //create reservation for the waitingList and remove from waitingList
      allWaitingListItems.forEach(async (waiting) => {
        if (waiting.user.id === undefined) return 'user not found';
        const reservation = this.reservationRepository.create({
          book: { id: id },
          user: { id: waiting.user.id },
          reservedAt: new Date(),
        });
        console.log('je suis la reservation',reservation);
        await this.reservationRepository.save(reservation);
        await this.waitingListRepository.delete(waiting.id);
      });
    }
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
