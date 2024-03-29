import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signIn(userData: CreateUserDto): Promise<Partial<User>> {
    //The create() method takes an object representing the properties of the entity.
    // This object is not saved to the database yet; it's just a JavaScript object in memory
    const user = this.UserRepository.create(
      //create a new object with the same properties and values as userData.
      // This is a way to clone the properties of one object into a new object.
      { ...userData}
    );
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userData.password, user.salt);
    try {
      await this.UserRepository.save(user);
    } catch (error) {
      if(error.code === 'ER_DUP_ENTRY') {
        if(error.message.includes('email')) {
          throw new ConflictException('Email already exists');
        } else if (error.message.includes('username')) {
          throw new ConflictException('Username already exists');
        }
      }
      throw error;
    }
    console.log(user);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin
    };
  }
  async login(credentials: LoginDto) {
    // recuperer le login et le mot de passe
    const {email, password} = credentials;
    //login using email and password
    console.log(credentials);
    const user = await this.UserRepository.createQueryBuilder("user")
      .where("user.email = :email or user.username = :email",// si on veut logger avec le username on ajoute user.username= :email
        {email}
        )
      .getOne()

    if (!user){
      throw new NotFoundException('email ou password incorrect');
    }
    console.log(user);
    const hashed = await bcrypt.hash(password, user.salt);
    //security vulnerability || user.password === password
    if (hashed === user.password || user.password === password){
      const payload = {
        username :user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
      //nahit await hna
      const jwt = await this.jwtService.sign(payload);

      return {
        "user": user,
        "access_token": jwt
      };
    } else {
      throw new NotFoundException('email or password incorrect');
    }
  }
}
