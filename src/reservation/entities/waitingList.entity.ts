import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

export class WaitingList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.waitingLists)
  user: User;

  @ManyToOne(() => Book, (book) => book.waitingLists)
  book: Book;

  @CreateDateColumn()
  joinedAt: Date;
}
