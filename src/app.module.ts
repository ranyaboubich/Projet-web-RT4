import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users/users.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, BooksModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
