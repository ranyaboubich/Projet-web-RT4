import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Username is required'
    }
  )
  @IsString()
  @MaxLength(20,{message: 'Username must be less than 20 characters'})
  username: string;

  @IsNotEmpty({message: 'Email is required'})
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {message: 'Password must be at least 8 characters'})
  @IsString()
  password: string;

  @IsOptional()
  isAdmin: boolean = false;
}
