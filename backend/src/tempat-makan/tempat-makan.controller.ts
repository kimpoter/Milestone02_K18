import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateTempatMakanDto, DeleteTempatMakanDto, UpdateTempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempatMakan
  @Public()
  @Get('/:campus?')
  getAllTempatMakan(@Param() param, @Query() query) {
    return this.tempatMakanService.getAllTempatMakan(param, query)
  }

  // Create tempatMakan
  @Public()
  @Post()
  createTempatMakan(@Body() dto: CreateTempatMakanDto) {
    return this.tempatMakanService.createTempatMakan(dto)
  }

  // Update tempatMakan
  @Public()
  @Put()
  updateTempatMakan(@Body() dto: UpdateTempatMakanDto) {
    return this.tempatMakanService.updatTempatMakan(dto)
  }

  // Delete tempatMakan
  @Public()
  @Delete()
  deleteTempatMakan(@Body() dto: DeleteTempatMakanDto) {
    return this.tempatMakanService.deleteTempatMakan(dto)
  }

}
