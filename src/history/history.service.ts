import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { RanchService } from 'src/ranch/ranch.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    private usersService: UsersService,
    private inventoryService: InventoryService,
    private ranchService: RanchService
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const { inventario, ranch, user } = createHistoryDto;
    const existInventory = await this.inventoryService.findOne(inventario);
    const existRanch = await this.ranchService.findOne(ranch);
    const existUser = await this.usersService.findOne(user);

    const history = this.historyRepository.create({
      ...createHistoryDto,
      inventario: existInventory,
      ranch: existRanch,
      user: existUser
    });
    return this.historyRepository.save(history);
  }

  async findAll() {
    const history = await this.historyRepository.find();
    if (history.length > 0) {
      return history;
    } else {
      throw new BadRequestException('No existen historiales');
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
    if (!history) throw new BadRequestException('No existe el historial');
    return history;
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const exist = await this.historyRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el historial');

    const { inventario, ranch, user } = updateHistoryDto;
    const existInventory = await this.inventoryService.findOne(inventario);
    const existRanch = await this.ranchService.findOne(ranch);
    const existUser = await this.usersService.findOne(user);

    const history = this.historyRepository.create({
      ...updateHistoryDto,
      inventario: existInventory,
      ranch: existRanch,
      user: existUser
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
