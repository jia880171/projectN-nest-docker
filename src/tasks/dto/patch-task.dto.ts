import { IsEnum, IsUUID, isValidationOptions, validate } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../task-status.enum';

export class PatchTaskDto {
  @IsUUID(undefined, { message: 'c8! Must be UUID' })
  id: string;

  @IsEnum(TaskStatus,{message:'give me a taskStatus!'})
  status: TaskStatus;
}
