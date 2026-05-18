import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { Developer } from './developer.entity';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  // 🆕 Protected — needs JWT token!
  @UseGuards(JwtGuard)
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