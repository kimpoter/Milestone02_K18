import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReview {
  @IsNotEmpty()
  @IsNumber()
  tempatMakanId: number;
  
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  rating: number;
}
