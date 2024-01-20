import { isNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
