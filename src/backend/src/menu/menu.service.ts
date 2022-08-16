import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async getMenu(tempatMakanId: number) {
    const dataMenu = await this.prisma.menu.findMany({
      where: {
        tempatMakanId
      }
    })

    return {
      status: 'success',
      data: dataMenu
    }
  }

  async createMenu(dto: CreateMenuDto, tempatMakanId: number, role: string) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    try {
      await this.prisma.menu.create({
        data: {
          tempatMakanId,
          imageUrl: dto.imageUrl,
          description: dto.description
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Menu has been created'
    }
  }

  async deleteMenu(menuId: number, role: string) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    try {
      await this.prisma.menu.delete({
        where: {
          id: menuId
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Menu has been deleted'
    }
  }
}
