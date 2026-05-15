import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { Developer } from './developer.entity';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  findAll(): Promise<Developer[]> {
    return this.developersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Developer> {
    return this.developersService.findOne(Number(id));
  }

  @Post()
  create(@Body() developer: Partial<Developer>): Promise<Developer> {
    return this.developersService.create(developer);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.developersService.remove(Number(id));
  }
}