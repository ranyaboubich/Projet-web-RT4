import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../Decorators/user.decorator';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { AdminGuard } from '../auth/Guards/admin.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async create(
    @User() user,
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return await this.reservationService.reserveBook(bookId, user.id);
    //return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @User() user
  ) {
    return this.reservationService.findAll(user);
  }

  @Get('waiting-list')
  @UseGuards(JwtAuthGuard)
  findAllWaitingList(
    @User() user
  ) {
    return this.reservationService.findAllWaitingList(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ){
    return this.reservationService.findOne(+id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.remove(+id);
  }
}
