import { isNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  @Column("simple-array")
  keywords: string[];
}
