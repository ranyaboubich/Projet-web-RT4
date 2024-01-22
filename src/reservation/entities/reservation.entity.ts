import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { ManyToOne, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.reservations, { onDelete: 'CASCADE' })
  book: Book;

  @Column()
  reservedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date;
}
