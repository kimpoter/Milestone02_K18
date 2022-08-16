import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  // Get all Bookmark
  async getAllBookmark(userId: number) {
    const dataBookmark = await this.prisma.bookmark.findMany({
      where: {
        userId
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
