import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  rating: number;
}
