import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./common/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { TempatMakanModule } from './tempat-makan/tempat-makan.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ReviewModule } from './review/review.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { PlatformModule } from './platform/platform.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, TempatMakanModule, BookmarkModule, ReviewModule, MenuModule, CategoryModule, UploadModule, PlatformModule, PaymentModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule { }
