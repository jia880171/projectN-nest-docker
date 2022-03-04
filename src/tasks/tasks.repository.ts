import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksReposotiry', { timestamp: true });
  async creatTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.statustt = :status', { status });
      // query.andWhere('task.status = :myStatus', {myStatus: 'OPEN'});
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
      // LIKE: partial match
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user${
          user.username
        }, Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.findOne({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async updateTaskStatus(
    patchTaskDto: PatchTaskDto,
    user: User,
  ): Promise<Task> {
    const { id, status } = patchTaskDto;
    let task = await this.findOne({ id, user });
    if (!task) {
      throw new NotFoundException(`Task update with ID ${id} not found`);
    }
    task.status = status;
    await this.save(task);
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<any> {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task Delete with ID ${id} not found`);
    }
    return result;
  }
}
