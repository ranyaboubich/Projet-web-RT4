import { IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  bookId: number;
}
