import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../Interface/payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      //comment authentifier les requetes
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: PayloadInterface ) {
    const user = await this.userRepository.findOne({ where: { username: payload.username } });
    // si le user existe je le retourne et la automatiquement ce que je retourne est stocké dans le request
    if (user){
      //const {password, salt, ...result} = user;
      //return result;
      delete user.salt;
      delete user.password;
      return user;
      // si le user n'existe pas je retourne une erreur
    } else {
      throw new UnauthorizedException();
    }

  }
}