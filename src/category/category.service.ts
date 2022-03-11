import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exist = await this.categoryRepository.findOne({
      nombre: createCategoryDto.nombre
    });
    if (exist) throw new BadRequestException('La categoria ya existe');
    const category = await this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    if (!categories) return [];
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new BadRequestException('No existe la categoria');
    return category;
  }

  async findByNombre(nombre: string) {
    const category = await this.categoryRepository.find({ nombre });
    if (!category) return [];
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new BadRequestException('No existe la categoria');
    await this.categoryRepository.update(id, updateCategoryDto);
    return 'Categoria actualizada';
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new BadRequestException('No existe la categoria');
    await this.categoryRepository.remove(category);
    return 'Categoria eliminada';
  }
}
