import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
