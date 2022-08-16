import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPlatformDto } from './dto';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) { }

  // GET all platforms
  async getAllPlatforms() {
    const platformData = await this.prisma.platform.findMany()

    return {
      status: 'success',
      data: platformData
    }
  }

  // Craete new platform
  async createPlatform(dto: createPlatformDto) {
    try {
      await this.prisma.platform.create({
        data: {
          name: dto.name
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Platform has been created'
    }
  }

  // Delete platform
  async deletePlatform(platformId: number) {
    try {
      await this.prisma.platform.delete({
        where: {
          id: platformId
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Platform has been deleted'
    }
  }
}
