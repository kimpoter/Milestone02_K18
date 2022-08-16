import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
// import { AtGuard } from "./common/guards";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_URL || 'http://localhost:3000',
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.useGlobalGuards(new AtGuard());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
