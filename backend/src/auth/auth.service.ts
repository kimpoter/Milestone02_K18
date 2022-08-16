import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto, SignInDto } from "./dto";
import * as argon2 from 'argon2'
import { Tokens } from "./types";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async getUserData(userId: number) {
    return await this.prisma.user.findMany({
      where: {
        id: userId
      },
      select: {
        username: true,
        email: true,
        role: true,
        bookmarks: true,
        reviews: true,
      }
    })
  }

  async signUpLocal(dto: SignUpDto) {
    if (dto.confirmPassword !== dto.password) {
      throw new ForbiddenException(
        "Password and confirm password must be same."
      );
    }

    // TODO: Save the user to database
    const hashedPassword = await this.hashData(dto.password);
    let newUser
    try {
      newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hashedPassword,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    // TODO: Create access and refresh token
    const tokens = await this.getTokens(newUser.email, newUser.role, newUser.username, newUser.id)

    // TODO: Update user data in database (add refresh token)
    await this.updateRtHash(newUser.id, tokens.refresh_token)

    // TODO: Return the access and refresh token
    return tokens
  }

  async signInLocal(dto: SignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new BadRequestException("Invalid Credentials");

    const passwordMatches = await argon2.verify(
      user.hashedPassword,
      dto.password
    );
    if (!passwordMatches) throw new BadRequestException("Invalid Credentials")

    // TODO: Generate access and refresh tokens
    const tokens = await this.getTokens(user.email, user.role, user.username, user.id);

    // TODO: Update user data in database (add refresh token)
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signOut(email: string) {
    const result = await this.prisma.user.updateMany({
      where: {
        email,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    if (!result.count) {
      throw new ForbiddenException("Invalid Request");
    }

    return {
      message: "Sign Out Success",
    };
  }

  async refreshTokens(email: string, rt: string,): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !user.hashedRefreshToken)
      throw new BadRequestException("Access Denied");

    const rtMatches = argon2.verify(user.hashedRefreshToken, rt);
    if (!rtMatches) throw new BadRequestException("Access Denied");

    // TODO: Generate access and refresh tokens
    const tokens = await this.getTokens(user.email, user.role, user.username, user.id);

    // TODO: Update user data in database (add refresh token)
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokens(
    email: string,
    role: string,
    username: string,
    id: number
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
          role,
          username,
          id
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 24 * 60 * 60, // 1 day
        }
      ),
      this.jwtService.signAsync(
        {
          email,
          role,
          username,
          id,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7, // 1 week
        }
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
