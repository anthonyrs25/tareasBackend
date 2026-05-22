import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        priority: dto.priority,
      },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.prisma.task.update({
      where: { id: Number(id) },
      data: dto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.task.delete({
      where: { id: Number(id) },
    });
  }
}