import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
 ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/Guards/jwt-auth.guard';
import { User } from 'src/Decorators/user.decorator';
import { AdminGuard } from '../auth/Guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user) {
    return this.usersService.update(user.id, updateUserDto); //only user can update itself
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  updateAnyUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateAnyUser(id, updateUserDto); //Admin can update any user
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
