import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class TempatMakanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsString()
  category: string

  @IsNotEmpty()
  @IsString()
  campus: 'GANESHA' | 'JATINANGOR'

  @IsString()
  address: string

  @IsNotEmpty()
  @IsNumber()
  latitude: number

  @IsNotEmpty()
  @IsNumber()
  longitude: number

  @IsNumber()
  timeOpen: number

  @IsNumber()
  timeClose: number

  @IsNumber()
  distance: number

  @IsNumber()
  rating: number

  @IsString()
  platform: string

  @IsString()
  paymentMethod: string
}