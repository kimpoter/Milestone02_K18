import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  // Get all Bookmark
  async getAllBookmark(userId: number, query) {
    // Sort status
    let sortStatus = query.sort_status
    if (sortStatus && sortStatus !== 'asc' && sortStatus !== 'desc') {
      throw new BadRequestException('Bad Request')
    } else if (sortStatus === '') {
      sortStatus = undefined
    }

    let sortData = query.sort_data
    if (sortData && sortData !== 'rating' && sortData !== 'distance' && sortData !== 'price') {
      throw new BadRequestException('Bad Request')
    } else if (sortData === '') {
      sortData = 'rating'
    }

    const dataBookmark = await this.prisma.bookmark.findMany({
      orderBy: {
        tempatMakan: {
          [sortData]: sortStatus
        }
      },
      where: {
        userId
      },
      include: {
        tempatMakan: {
          include: {
            platforms: true,
            paymentMethods: true,
            categories: true
          }
        }
      }
    })

    return {
      status: 'success',
      data: dataBookmark
    }

  }
  // Creat Bookmark
  async createBookmark(dto: CreateBookmarkDto, userId: number) {
    try {
      await this.prisma.bookmark.create({
        data: {
          tempatMakanId: dto.tempatMakanId,
          userId,
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: 'succes',
      message: 'Bookmark has been created'
    }
  }

  // Delete Bookmark
  async deleteBookmark(bookmarkId: number) {
    try {
      await this.prisma.bookmark.delete({
        where: {
          id: bookmarkId
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: "succes",
      message: 'Bookmark has been deleted'
    }
  }
}
