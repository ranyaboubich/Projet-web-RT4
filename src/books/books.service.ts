import { Injectable, NotFoundException } from '@nestjs/common';
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
     const book = await this.booksRepository.findOne({ where: { id: id } });
      if (!book) {
        throw new NotFoundException(`Book #${id} not found`);
      }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<void> {
    await this.booksRepository.update(id, updateBookDto);
    if (updateBookDto.instances) {
      //get waitinglist sorted by joinedAt limited by the number of instances

      const waitingList = await this.waitingListRepository.find({
        where: { book: { id: id } },
        relations: ['user'],
        order: { joinedAt: 'ASC' },
        take: updateBookDto.instances,
      });

      console.log('je suis la waitingList', waitingList);
      //create reservation for the waitingList and remove from waitingList
      waitingList.forEach(async (waiting) => {
        const reservation = this.reservationRepository.create({
          book: { id: id },
          user: { id: waiting.user.id },
          reservedAt: new Date(),
        });
        // ...

        await this.reservationRepository.save(reservation);
        await this.waitingListRepository.delete(waiting.id);
      });
    }
  }

  async remove(id: number): Promise<string> {
    const book = await this.booksRepository.findOne({ where: { id: id } });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    await  this.booksRepository.delete(id);
    return `Book #${id} deleted`;
  }
}
