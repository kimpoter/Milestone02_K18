import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    // Check if the review already exist
    const dataReview = await this.prisma.review.findMany({
      where: {
        tempatMakanId: tempatMakanId,
        userId: userId,
      }
    })

    if (dataReview[0]) {
      throw new BadRequestException('Review already exist')
    }

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
    const totalRating = dataTempatMakan.rating * (dataTempatMakan.reviews.length - 1) + dto.rating

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
    const dataReview = await this.prisma.review.findUnique({
      where: {
        id: reviewId
      },
    })

    const dataTempatMakan = await this.prisma.tempatMakan.findUnique({
      where: {
        id: dataReview.tempatMakanId
      },
      include: {
        reviews: true,
      }
    })

    // Calculate new rating
    const totalRating = dataTempatMakan.rating * dataTempatMakan.reviews.length - dataReview.rating;

    let ratingTempatMakan
    try {
      await this.prisma.review.delete({
        where: {
          id: reviewId,
        }
      })
      ratingTempatMakan = totalRating / (dataTempatMakan.reviews.length - 1)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    // Update rating on tempat makan
    try {
      await this.prisma.tempatMakan.update({
        where: {
          id: dataReview.tempatMakanId
        },
        data: {
          rating: ratingTempatMakan
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }

    return {
      status: 'success',
      message: 'Review has been deleted'
    }
  }

}

