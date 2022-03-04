import { User } from 'src/auth/user.entity';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  deleteTaskById(id: string, user: User): Promise<any> {
    return this.tasksRepository.deleteTaskById(id, user);
  }

  updateTaskStatus(patchTaskDto: PatchTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(patchTaskDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.creatTask(createTaskDto, user);
  }
}
