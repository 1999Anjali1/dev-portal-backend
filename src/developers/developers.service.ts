import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from './developer.entity';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private developersRepository: Repository<Developer>
  ) {}

  // GET all developers
  findAll(): Promise<Developer[]> {
    return this.developersRepository.find();
  }

  // GET one developer
  async findOne(id: number): Promise<Developer> {
    const developer = await this.developersRepository.findOneBy({ id });
    if (!developer) {
      throw new NotFoundException(`Developer with id ${id} not found`);
    }
    return developer;
  }

  // POST create developer
  async create(developer: Partial<Developer>): Promise<Developer> {
    const newDeveloper = this.developersRepository.create(developer);
    return this.developersRepository.save(newDeveloper);
  }

  // DELETE developer
  async remove(id: number): Promise<{ message: string }> {
    const developer = await this.findOne(id);
    await this.developersRepository.remove(developer);
    return { message: `Developer ${id} deleted successfully` };
  }
}
