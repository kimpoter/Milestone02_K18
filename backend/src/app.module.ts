import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./common/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { TempatMakanModule } from './tempat-makan/tempat-makan.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ReviewModule } from './review/review.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, PrismaModule, TempatMakanModule, BookmarkModule, ReviewModule, MenuModule, CategoryModule, UploadModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
