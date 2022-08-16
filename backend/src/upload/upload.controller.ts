import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserRole } from 'src/common/decorators';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  // Upload tempatMakan Image
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadTempatMakanImage(@UploadedFile() file: Express.Multer.File, @GetCurrentUserRole() role: string) {
    return this.uploadService.uploadImage(file, role)
  }
}
