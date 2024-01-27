import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Entity,
} from 'typeorm';
@Entity()
export class WaitingList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.waitingLists, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.waitingLists,{ onDelete: 'CASCADE' })
  book: Book;

  @CreateDateColumn()
  joinedAt: Date;
}
