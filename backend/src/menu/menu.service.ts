import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async getMenu(id) {
    const dataMenu = await this.prisma.menu.findMany({
      where: {
        tempatMakanId: id
      }
    })

    return {
      status: 'success',
      data: dataMenu
    }
  }

  async createMenu(dto: CreateMenuDto, id) {
    try {
      await this.prisma.menu.create({
        data: {
          tempatMakanId: id,
          imageUrl: dto.imageUrl,
          description: dto.description
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'menu has been created'
    }
  }

  async updateMenu(dto: CreateMenuDto, id) {
    try {
      await this.prisma.menu.update({
        where: {
          id
        },
        data: {
          imageUrl: dto.imageUrl,
          description: dto.description
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'menu has been updated'
    }
  }

  async deleteMenu(id) {
    try {
      await this.prisma.menu.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'menu has been deleted'
    }
  }
}
