import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  // Upload tempatMakan Image
  @Public()
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadTempatMakanImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file)
  }
}
