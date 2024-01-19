import { IsEmail, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    unique: true,
  })
  @IsString()
  username: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;
  @Column()
  salt: string;

  // @Column({type: 'enum', enum:UserRoleEnum, default: UserRoleEnum.User}) role: string;
}
