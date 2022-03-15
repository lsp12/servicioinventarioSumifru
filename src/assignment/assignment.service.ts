import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = await this.assignmentsRepository.create(
      createAssignmentDto,
    );
    await this.assignmentsRepository.save(assignment);
    return await this.assignmentsRepository.findOne(assignment.id);
  }

  findAll() {
    return `This action returns all assignment`;
  }

  async findByUser(id: number) {
    const assignment = await this.assignmentsRepository.find({
      where: {
        user: id,
      },
      order: {
        ranch: 'ASC',
      },
      relations: ['ranch', 'ranch.zona'],
    });
    return assignment;
  }

  async findByRanch(id: number) {
    const assignment = await this.assignmentsRepository.find({
      where: {
        ranch: id,
      },
      relations: ['user', 'user.role'],
    });
    return assignment;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
