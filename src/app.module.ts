import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [BooksModule, AdminModule, UsersModule, AuthModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
