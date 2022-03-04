import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

// use UseFilters  to customize exception
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { QueryFailedExceptionFilter } from 'src/filters/typeOrmError.filter';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard('myJwt'))
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(
    private taskService: TasksService,
    private configService: ConfigService,
  ) {
    console.log('====== test value: ', configService.get('TEST_VALUE'));
  }

  @Get()
  getTasks(
    @Body() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.taskService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} create a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  @UseFilters(QueryFailedExceptionFilter)
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete('/:id')
  @UseFilters(QueryFailedExceptionFilter)
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<any> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch()
  updateTaskStatus(
    @Body() patchTaskDto: PatchTaskDto,
    @GetUser() user: User,
  ): any {
    return this.taskService.updateTaskStatus(patchTaskDto, user);
  }
}
