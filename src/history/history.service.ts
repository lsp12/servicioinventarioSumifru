import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const { inventario, ranch, user } = createHistoryDto;

    const history = this.historyRepository.create({
      ...createHistoryDto,
      inventario,
      ranch,
      user
    });
    return this.historyRepository.save(history);
  }

  async findAll() {
    const history = await this.historyRepository.find({
      order: { idHistorial: 'DESC' },
      relations: ['user', 'inventario', 'ranch', 'ranch.zona']
    });
    if (history.length > 0) {
      return history;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const history = await this.historyRepository.find({
      where: {
        inventory: {
          idInventario: id
        }
      },
      relations: ['user', 'inventory']
    });
    if (!history) return [];
    return history;
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const exist = await this.historyRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el historial');

    const { inventario, ranch, user } = updateHistoryDto;

    const history = this.historyRepository.create({
      ...updateHistoryDto,
      inventario,
      ranch,
      user
    });

    await this.historyRepository.update(id, history);
    return 'Historial actualizado';
  }

  async remove(id: number) {
    const exist = await this.historyRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el historial');
    await this.historyRepository.delete(id);
    return 'Historial eliminado';
  }
}
