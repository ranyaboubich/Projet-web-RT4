import { IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  bookId: number;
}
