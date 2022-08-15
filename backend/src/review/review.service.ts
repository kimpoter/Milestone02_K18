import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReview } from './dto';


@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  // Get Review
  async getReview(id) {
    const dataReview = await this.prisma.review.findMany({
      where: {tempatMakanId : id }});
        

    return {
      status: 'success',
      data: dataReview
    }
  }


  // Create Review
  async createReview(dto: CreateReview) {
    

    // Save tmepat makan data to the database
    try {
      await this.prisma.review.create({
        data: {
          userId: 1,
          tempatMakanId : dto.tempatMakanId,
          content : dto.content,
          rating : dto.rating
        },
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
  async deleteReview(tempatMakanId: number) {
    try {
      await this.prisma.review.delete({
        where: {
          id: tempatMakanId
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

