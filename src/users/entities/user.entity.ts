import { Reservation } from 'src/reservation/entities/reservation.entity';
import { WaitingList } from 'src/reservation/entities/waitingList.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  admin: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => WaitingList, (waitingList) => waitingList.user)
  waitingLists: WaitingList[];
}
