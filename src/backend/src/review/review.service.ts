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

    // Get data tempatMakan
    const dataTempatMakan = await this.prisma.tempatMakan.findUnique({
      where: {
        id: tempatMakanId,
      },
      include: {
        reviews: true
      }
    })

    // Calculate total rating
    const totalRating = dataTempatMakan.rating + dto.rating

    // Calculate final rating
    const ratingTempatMakan = totalRating / (dataTempatMakan.reviews.length)

    // Update rating tempat makan
    try {
      await this.prisma.tempatMakan.update({
        where: {
          id: dataTempatMakan.id
        },
        data: {
          rating: ratingTempatMakan
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

