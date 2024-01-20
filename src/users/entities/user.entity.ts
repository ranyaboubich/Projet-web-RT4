import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
    nullable: false,
  })
  email: string;

  @Column({nullable: false})
  password: string;

  @Column()
  salt: string;

  @Column({nullable: true})
  isAdmin: boolean;
}
