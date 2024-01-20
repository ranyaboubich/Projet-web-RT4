import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {
  }

  @Post('signin')
  async signIn(
    @Body() userData: CreateUserDto
  ):Promise<Partial<User>>{
    return this.authService.signIn(userData);
  }

  @Post('login')
  async login(
    @Body() credentials: LoginDto
  ){
    return this.authService.login(credentials);
  }

}
