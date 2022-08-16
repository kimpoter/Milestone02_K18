import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  // Get all Bookmark
  async getAllBookmark(id) {
    const dataBookmark = await this.prisma.bookmark.findMany({
      where: {
        userId: id
      }
    })

    return {
      status: 'success',
      data: dataBookmark
    }

  }
  // Creat Bookmark
  async createBookmark(id) {
    try {
      await this.prisma.bookmark.create({
        data: {
          tempatMakanId: id,
          userId: 1
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
  async deleteBookmark(id: number) {
    try {
      await this.prisma.bookmark.delete({
        where: {
          id
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
