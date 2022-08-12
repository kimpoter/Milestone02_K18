import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TempatMakanDto } from './dto';

@Injectable()
export class TempatMakanService {
  constructor(private prisma: PrismaService) { }

  // Get all tempat makan
  async getAllTempatMakan() {
    const dataAllTempatMakan = await this.prisma.tempatMakan.findMany({})
    return dataAllTempatMakan
  }

  // Create tempat makan
  async createTempatMakan(dto: TempatMakanDto) {
    // Save tmepat makan data to the database
    try {
      const resultCreateTempatMakan = await this.prisma.tempatMakan.create({
        data: {
          name: dto.name,
          description: dto.description,
          imageUrl: dto.imageUrl,
          campus: dto.campus,
          address: dto.address,
          latitude: dto.latitude,
          longitude: dto.longitude,
          timeOpen: dto.timeOpen,
          timeClose: dto.timeClose,
          distance: dto.distance,
          rating: dto.rating,
          paymentMethods: dto.paymentMethods,
          platform: dto.platform,
          userId: 1
        }
      })
      return resultCreateTempatMakan
    } catch (error) {
      return error
    }
  }

  // Delete tempat makan
  async deleteTempatMakan() {
    const test = 1
  }
}
