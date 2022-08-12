import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { TempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempat makan
  @Public()
  @Get(':id')
  getAllTempatMakan() {
    return this.tempatMakanService.getAllTempatMakan()
  }

  // Create tempat makan
  @Public()
  @Post('kambing')
  createTempatMakan(@Body() dto: TempatMakanDto) {
    return this.tempatMakanService.createTempatMakan(dto)
  }

  // Delete tempat makan
  @Public()
  @Delete()
  deleteTempatMakan() {
    // return this.tempatMakanService.deleteTempatMakan()
  }
}
