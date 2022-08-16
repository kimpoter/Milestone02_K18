import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto';


@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  // Get Review
  async getReview(id) {
    const dataReview = await this.prisma.review.findMany({
      where: { tempatMakanId: id },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    return {
      status: 'success',
      data: dataReview
    }
  }


  // Create Review
  async createReview(dto: CreateReviewDto, tempatMakanId: number, userId: number) {
    // Save review data to the database
    try {
      await this.prisma.review.create({
        data: {
          userId,
          content: dto.content,
          rating: dto.rating,
          tempatMakanId,
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: 'success',
      message: 'Review has been created'
    }
  }


  // Delete Review
  async deleteReview(reviewId: number) {
    try {
      await this.prisma.review.delete({
        where: {
          id: reviewId,
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Review has been deleted'
    }
  }

}

