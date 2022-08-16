import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
// import { AtGuard } from "./common/guards";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  }))
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // app.useGlobalGuards(new AtGuard());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
