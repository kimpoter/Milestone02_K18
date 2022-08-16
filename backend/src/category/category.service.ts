import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  // get all category 
  async getAllCategory() {
    const datacategory = await this.prisma.category.findMany({})
    return {
      status: "success",
      data: datacategory
    }
  }

  //createcategory
  async createCategory(dto: CreateCategoryDto, role: string) {
    // Check if current user is admin
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    try {
      await this.prisma.category.create({
        data: {
          name: dto.name
        }
      })
    }
    catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: 'success', message: 'category has been created'
    }
  }


  //
  async deleteCategory(id: number, role: string) {
    // Check if current user is admin
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    try {
      await this.prisma.category.delete({
        where: {
          id
        }
      })
    }
    catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: 'success', message: 'category has been deleted'
    }
  }
}

