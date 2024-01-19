import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor(
        private Repository<User>
    ){
    }
  async login(user: UserSubsrcibeDto) {

  }
}
