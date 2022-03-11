import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { Doc } from './entities/doc.entity';

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(Doc)
    private readonly docRepository: Repository<Doc>
  ) {}
  async createMantenimientoDoc(createDocDto: CreateDocDto, filePath) {
    Promise.all(
      filePath.map(async (file) => {
        const { originalname, filePath, path } = file;
        const doc = this.docRepository.create({
          ...createDocDto,
          nSemanas: createDocDto.nSemanas as unknown as number,
          originalname,
          filePath,
          path
        });
        await this.docRepository.save(doc);
      })
    );
    return 'documentos creado';
  }

  findAll() {
    return `This action returns all doc`;
  }

  async findMantenimiento() {
    const docs = await this.docRepository.find({
      where: {
        departamento: 'mantenimiento'
      }
    });
    return docs;
  }

  findOne(id: number) {
    return `This action returns a #${id} doc`;
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
  }

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
