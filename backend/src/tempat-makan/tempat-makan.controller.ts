import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { TempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempat makan
  @Public()
  @Get('/:campus?')
  getAllTempatMakan(@Param() param, @Query() query) {
    return this.tempatMakanService.getAllTempatMakan(param, query)
  }

  // Create tempat makan
  @Public()
  @Post()
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
