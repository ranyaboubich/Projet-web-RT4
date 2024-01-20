import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  async signIn(userData: CreateUserDto): Promise<User> {
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
      throw new ConflictException('Username already exists');
    }
    return user;
  }
}
