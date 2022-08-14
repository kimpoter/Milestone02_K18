import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateTempatMakanDto, UpdateTempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempatMakan
  @Public()
  @Get('/campus/:campus?')
  getAllTempatMakan(@Param() param, @Query() query) {
    return this.tempatMakanService.getAllTempatMakan(param, query)
  }

  // Get single tempatMakan
  @Public()
  @Get('/:id')
  getSingleTempatMakan(@Param('id') id: number) {
    return this.tempatMakanService.getSingleTempatmakan(+id)
  }

  // Create tempatMakan
  @Public()
  @Post()
  createTempatMakan(@Body() dto: CreateTempatMakanDto) {
    return this.tempatMakanService.createTempatMakan(dto)
  }

  // Update tempatMakan
  @Public()
  @Put(':id')
  updateTempatMakan(@Body() dto: UpdateTempatMakanDto, @Param('id') id: number) {
    return this.tempatMakanService.updateTempatMakan(dto, +id)
  }

  // Delete tempatMakan
  @Public()
  @Delete(':id')
  deleteTempatMakan(@Param('id') id: number) {
    return this.tempatMakanService.deleteTempatMakan(+id)
  }

}
