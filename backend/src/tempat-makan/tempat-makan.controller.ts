import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { TempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempat makan
  @Public()
  @Get()
  getAllTempatMakan() {
    return this.tempatMakanService.getAllTempatMakan()
  }

  // Create tempat makan
  @Public()
  @Post()
  createTempatMakan(@Body() dto: TempatMakanDto) {
    return this.tempatMakanService.createTempatMakan(dto)
  }

  // Delete tempat makan
  @Public()
  @Post()
  deleteTempatMakan() {
    // return this.tempatMakanService.deleteTempatMakan()
  }
}
