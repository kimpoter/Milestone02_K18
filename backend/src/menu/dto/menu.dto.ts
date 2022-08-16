import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}