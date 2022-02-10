import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Res,
  StreamableFile
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor
} from '@nestjs/platform-express';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { editFileName } from './file-upload.utils';
import { createReadStream } from 'fs';
import { join } from 'path/posix';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files[]', 20, {
      storage: diskStorage({
        destination: './files/Reportmantenimiento',
        filename: editFileName
      })
    })
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createDocDto: CreateDocDto
  ) {
    console.log(files);
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filePath: file.filename,
        path: file.path
      };
      response.push(fileReponse);
    });
    console.log(response);

    return this.docService.createMantenimientoDoc(createDocDto, response);
  }

  @Get('/mantenimiento')
  findMantenimiento() {
    return this.docService.findMantenimiento();
  }

  @Get('/mantenimiento/:id')
  seeUploadedFile(@Param('id') id, @Res() res: Response) {
    /* const file = createReadStream(join('./files/Reportmantenimiento', id));
    console.log('holaaa ', new StreamableFile(file));
    return new StreamableFile(file); */
    return res.download(join('./files/Reportmantenimiento', id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docService.update(+id, updateDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docService.remove(+id);
  }
}
