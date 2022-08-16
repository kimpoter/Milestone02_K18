import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { createPlatformDto } from './dto';
import { PlatformService } from './platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) { }

  // GET all platforms
  @Public()
  @Get()
  async getAllPlatforms() {
    return await this.platformService.getAllPlatforms()
  }

  // Create new platform
  @Public()
  @Post()
  async createPlatform(@Body() dto: createPlatformDto) {
    return await this.platformService.createPlatform(dto)
  }

  // Delete platform
  @Public()
  @Delete('/:id')
  async deletePlatform(@Param('id') platformId: number) {
    return await this.platformService.deletePlatform(+platformId)
  }
}
