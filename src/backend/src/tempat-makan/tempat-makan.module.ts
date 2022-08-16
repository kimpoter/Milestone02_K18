import { Module } from '@nestjs/common';
import { TempatMakanService } from './tempat-makan.service';
import { TempatMakanController } from './tempat-makan.controller';

@Module({
  providers: [TempatMakanService],
  controllers: [TempatMakanController]
})
export class TempatMakanModule {}
