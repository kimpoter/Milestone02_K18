import { IsString } from 'class-validator'

export class CreateMenuDto {
  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}