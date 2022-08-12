import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto, SignInDto, VerifyAccountDto } from "./dto";
import * as bcrypt from "bcrypt";
import { Tokens } from "./types";
import { JwtService } from "@nestjs/jwt";
import { createTransport } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async signUpLocal(dto: SignUpDto) {
    if (dto.confirmPassword !== dto.password) {
      throw new ForbiddenException(
        "Password and confirm password must be same."
      );
    }
    const hashedPassword = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        hashedPassword,
      },
    });

    // TODO: Create transporter for nodemailer
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    // TODO: Create the userVerificationToken to database
    const verificationToken = uuidv4() + "-" + uuidv4();
    try {
      const expiresTime = 15 * 60 * 1000; // 15 minutes
      const hashedVerificationToken = await this.hashData(verificationToken);
      await this.prisma.userVerificationToken.create({
        data: {
          expires: new Date(new Date().getTime() + expiresTime),
          hashedToken: hashedVerificationToken,
          userId: newUser.id,
        },
      });
    } catch {
      throw new ForbiddenException("Internal Server Error");
    }

    // TODO: Set the nodemailer config
    const mailOptions = {
      to: dto.email,
      subject: "ITBFood Account Verification",
      html: `${verificationToken}`,
    };

    // TOOD: Send the email to the user
    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        throw new ForbiddenException(error);
      }
    });
  }

  async signInLocal(dto: SignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException("Access Denied");

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hashedPassword
    );
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.email, user.role, user.username);
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

  async refreshTokens(email: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException("Access Denied");

    const rtMatches = bcrypt.compare(rt, user.hashedRefreshToken);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.email, user.role, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async verifyAccount(dto: VerifyAccountDto) {
    // TODO: Get the current user data for making the token later
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    // TODO: Check if the token with the current email is exist or not
    const hashedUserVerificationTokenArray =
      await this.prisma.userVerificationToken.findMany({
        where: {
          user: {
            email: dto.email,
          },
        },
      });

    if (hashedUserVerificationTokenArray.length === 0)
      throw new ForbiddenException("Token does not exist");
    const hashedUserVerificationToken = hashedUserVerificationTokenArray[0];

    // TODO: Check if the token is valid or not
    const tokenMatches = await bcrypt.compare(
      dto.token,
      hashedUserVerificationToken.hashedToken
    );
    if (!tokenMatches) return new ForbiddenException("Invalid token");

    // TODO: Check if the token is expired or not
    let isExpires = false;
    if (hashedUserVerificationToken.expires.getTime() < new Date().getTime())
      isExpires = true;
    if (isExpires) return new ForbiddenException("Token expired");

    // TODO:  Update isVerified column of User Table in database
    // TODO: Delete the userVerificationToken in database
    try {
      await this.prisma.user.update({
        where: {
          email: dto.email,
        },
        data: {
          isVerified: true,
        },
      });
      await this.prisma.userVerificationToken.deleteMany({
        where: {
          user: {
            email: dto.email,
          },
        },
      });
    } catch {
      throw new ForbiddenException("Internal server error");
    }

    // TODO: Create the access and refresh token then returned it
    const tokens = await this.getTokens(user.email, user.role, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens.access_token;
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
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    email: string,
    role: string,
    username: string
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
          role,
          username,
        },
        {
          secret: "0d553a9c-9bf1-4f3c-812f-252df640e435",
          expiresIn: 30, // 30 seconds
        }
      ),
      this.jwtService.signAsync(
        {
          email,
          role,
          username,
        },
        {
          secret: "58ec3eac-6d8e-4caf-8ca0-1de865090745",
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
