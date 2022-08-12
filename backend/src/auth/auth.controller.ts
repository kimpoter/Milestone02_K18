import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import {
  GetCurrentUser,
  GetCurrentUserEmail,
  Public,
} from "src/common/decorators";
import { RtGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto, VerifyAccountDto } from "./dto";
import { Tokens } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SignUpDto) {
    this.authService.signUpLocal(dto);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @Post("signout")
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserEmail() email: string) {
    return this.authService.signOut(email);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserEmail() email: string,
    @GetCurrentUser("refreshToken") refreshToken: string
  ) {
    return this.authService.refreshTokens(email, refreshToken);
  }

  @Public()
  @Post("account/verify")
  verifyccount(
    @Body() dto: VerifyAccountDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const access_token = this.authService.verifyAccount(dto);
    res.cookie("a-token", access_token, {
      maxAge: 30 * 1000, // 30 seconds
      httpOnly: true,
    });
    return access_token;
  }
}
