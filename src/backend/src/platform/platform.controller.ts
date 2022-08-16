import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserRole, Public } from 'src/common/decorators';
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
  @Post()
  async createPlatform(@Body() dto: createPlatformDto, @GetCurrentUserRole() role: string) {
    return await this.platformService.createPlatform(dto, role)
  }

  // Delete platform
  @Delete('/:id')
  async deletePlatform(@Param('id') platformId: number, @GetCurrentUserRole() role: string) {
    return await this.platformService.deletePlatform(+platformId, role)
  }
}
