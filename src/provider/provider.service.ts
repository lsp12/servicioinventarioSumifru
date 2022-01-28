import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}
  async create(createProviderDto: CreateProviderDto) {
    const exist = await this.providersRepository.findOne({
      nombre: createProviderDto.nombre
    });
    if (exist) throw new BadRequestException('El proveedor ya existe');
    const provider = await this.providersRepository.create(createProviderDto);
    return await this.providersRepository.save(provider);
  }

  async findAll() {
    const providers = await this.providersRepository.find();
    if (!providers) return [];
    return providers;
  }

  async findOne(id: number) {
    const provider = await this.providersRepository.findOne(id);
    if (!provider) throw new BadRequestException('No existe el proveedor');
    return provider;
  }

  async findByNombre(nombre: string) {
    const provider = await this.providersRepository.find({ nombre });
    if (!provider) return [];
    return provider;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providersRepository.findOne(id);
    if (!provider) throw new BadRequestException('No existe el proveedor');
    await this.providersRepository.update(id, updateProviderDto);
    return 'Proveedor actualizado';
  }

  async remove(id: number) {
    const provider = await this.providersRepository.findOne(id);
    if (!provider) throw new BadRequestException('No existe el proveedor');
    await this.providersRepository.remove(provider);
    return 'Proveedor eliminado';
  }
}
