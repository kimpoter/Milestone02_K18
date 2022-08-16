import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateReviewDto } from './dto';
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
  @Post('/:id')
  createReview(@Param('id') tempatMakanId: number, @Body() dto: CreateReviewDto, @GetCurrentUserId() userId: number) {
    return this.reviewService.createReview(dto, +tempatMakanId, userId)
  }

  // Delete review
  @Delete(':id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(+reviewId)
  }

}

