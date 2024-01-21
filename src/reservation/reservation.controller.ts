import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../Decorators/user.decorator';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @User() user,
    @Req() request: Request,
  ) {
    const { bookId } = createReservationDto;
    await this.reservationService.reserveBook(bookId, user.id);
    return 'reservation processed';
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Delete(':id')
  //@User() user
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
