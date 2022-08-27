import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetCurrentUserId, GetCurrentUserRole, Public } from 'src/common/decorators';
import { CreateTempatMakanDto, UpdateTempatMakanDto } from './dto';
import { TempatMakanService } from './tempat-makan.service';

@Controller('tempat-makan')
export class TempatMakanController {
  constructor(private tempatMakanService: TempatMakanService) { }

  // Get all tempatMakan
  @Public()
  @Get('/campus/:campus/:skip?')
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
  @Post()
  createTempatMakan(@Body() dto: CreateTempatMakanDto, @GetCurrentUserRole() role: string, @GetCurrentUserId() userId: number,) {
    return this.tempatMakanService.createTempatMakan(dto, role, userId)
  }

  // Update tempatMakan
  @Put(':id')
  updateTempatMakan(@Body() dto: UpdateTempatMakanDto, @Param('id') id: number, @GetCurrentUserRole() role: string) {
    return this.tempatMakanService.updateTempatMakan(dto, +id, role)
  }

  // Delete tempatMakan
  @Delete(':id')
  deleteTempatMakan(@Param('id') id: number, @GetCurrentUserRole() role: string) {
    return this.tempatMakanService.deleteTempatMakan(+id, role)
  }

}
