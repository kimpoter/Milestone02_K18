import {
  Body,
  Controller,
  Get,
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
  GetCurrentUserId,
  GetCurrentUserRole,
  GetCurrentUserUsername,
  Public,
} from "src/common/decorators";
import { RtGuard } from "src/common/guards";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('/user')
  async getCurrentUserData(@GetCurrentUserEmail() email: string, @GetCurrentUserId() userId: number, @GetCurrentUserRole() role: string, @GetCurrentUserUsername() username: string) {
    return {
      status: 'success',
      data: {
        userId,
        username,
        email,
        role,
      }
    }
  }

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<object> {
    const tokens = await this.authService.signUpLocal(dto);
    const { access_token, refresh_token } = tokens

    // Set the access_token in cookie
    res.cookie("ITBFood_AT", access_token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 minute
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    // Set the refresh_token in cookie
    res.cookie("ITBFood_RT", refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return {
      status: 'success',
      message: 'Account has been created'
    }
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.signInLocal(dto);
    const { access_token, refresh_token } = tokens

    // Set the access_token in cookie
    res.cookie("ITBFood_AT", access_token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 minute
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    // Set the refresh_token in cookie
    res.cookie("ITBFood_RT", refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return {
      status: 'success',
      message: 'Sign In success'
    }
  }

  @Post("signout")
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserEmail() email: string, @Res({ passthrough: true }) res: Response) {
    res.cookie("ITBFood_AT", '', {
      maxAge: -1,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
    res.cookie("ITBFood_RT", '', {
      maxAge: -1,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
    return this.authService.signOut(email);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserEmail() email: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const tokens = await this.authService.refreshTokens(email, refreshToken);
    const { access_token, refresh_token } = tokens

    // Set the access_token in cookie
    res.cookie("ITBFood_AT", access_token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 minute
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    // Set the refresh_token in cookie
    res.cookie("ITBFood_RT", refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return {
      status: 'success',
      message: 'New Token has been generated'
    }
  }
}
