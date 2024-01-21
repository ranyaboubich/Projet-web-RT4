import { Reservation } from 'src/reservation/entities/reservation.entity';
import { WaitingList } from 'src/reservation/entities/waitingList.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  title: string;
  @Column()
  category: string;
  @Column()
  author: string;
  @Column()
  keywords: string[];
  @Column()
  instances: number;
  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];
  @OneToMany(() => WaitingList, (waitingList) => waitingList.book)
  waitingLists: WaitingList[];
}
