import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Write database connection
    TypeOrmModule.forRoot({
      name: 'write',
      type: 'postgres',
      host: process.env.WRITE_DATABASE_HOST || 'localhost',
      port: parseInt(process.env.WRITE_DATABASE_PORT || '5432', 10),
      username: process.env.WRITE_DATABASE_USER || 'postgres',
      password: process.env.WRITE_DATABASE_PASSWORD || 'postgres',
      database: process.env.WRITE_DATABASE_NAME || 'bootcamp_db_write',
      entities: [User],
      synchronize: true, // false in production
    }),

    // Read database connection
    TypeOrmModule.forRoot({
      name: 'read',
      type: 'postgres',
      host: process.env.READ_DATABASE_HOST || 'localhost',
      port: parseInt(process.env.READ_DATABASE_PORT || '5432', 10),
      username: process.env.READ_DATABASE_USER || 'postgres',
      password: process.env.READ_DATABASE_PASSWORD || 'postgres',
      database: process.env.READ_DATABASE_NAME || 'bootcamp_db_read',
      entities: [User],
      synchronize: true, // false in production
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}