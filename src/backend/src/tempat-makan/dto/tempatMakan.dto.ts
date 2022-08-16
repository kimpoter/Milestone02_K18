import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTempatMakanDto {
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

  @IsString()
  timeOpen: string

  @IsString()
  timeClose: string

  @IsNumber()
  distance: number

  @IsString()
  platform: string

  @IsString()
  paymentMethod: string
}

export class UpdateTempatMakanDto {
  @IsNotEmpty()
  @IsNumber()
  tempatMakanId: number;

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

  @IsString()
  timeOpen: string

  @IsString()
  timeClose: string

  @IsNumber()
  distance: number

  @IsNumber()
  rating: number

  @IsString()
  platform: string

  @IsString()
  paymentMethod: string
}