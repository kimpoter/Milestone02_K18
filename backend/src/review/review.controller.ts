import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateReview } from './dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }

  // Get review
  @Public()
  @Get('/:id')
  getReview(@Param('id') tempatMakanId: number) {
    return this.reviewService.getReview(+tempatMakanId)
  }

  // Create review
  @Public()
  @Post()
  createReview(@Body() dto: CreateReview) {
    return this.reviewService.createReview(dto)
  }

  // Delete review
  @Public()
  @Delete(':id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(+reviewId)
  }

}

