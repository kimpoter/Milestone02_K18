import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const authRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .mutation("register", {
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z
        .string()
        .min(8, { message: "Password at least 8 characters." }),
      confirmPassword: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check if password and confirm password the same
      if (input.password !== input.confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password and confirm password must be same.",
        });
      }

      // Transporter for nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASS,
        },
      });

      // hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(input.password, salt, async (err, hashedPassword) => {
          try {
            // create new user on db
            const user = await ctx.prisma.user.create({
              data: {
                username: input.username,
                email: input.email,
                hashedPassword,
              },
            });

            // Create verification token
            const verificationToken = uuidv4() + uuidv4();

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(
                verificationToken,
                salt,
                async (err, hashedVerificationToken) => {
                  try {
                    await ctx.prisma.userVerificationToken.create({
                      data: {
                        expires: new Date(+new Date() + 30 * 60 * 1000),
                        token: hashedVerificationToken,
                        userId: user.id,
                      },
                    });
                    // send email to the user that just created
                    const mailOptions = {
                      to: input.email,
                      subject: "ITBFood Account Verification",
                      html: `
              <a href=${
                process.env.BASE_URL +
                "/auth/" +
                user.username +
                "/verify/" +
                verificationToken
              }>Click this link to verify your account.</a>
              `,
                    };
                    transporter.sendMail(mailOptions, async (error, info) => {
                      if (error) {
                        throw new TRPCError({
                          code: "INTERNAL_SERVER_ERROR",
                          message: "Failed to send verification email.",
                        });
                      }
                    });
                  } catch (error) {
                    throw new TRPCError({
                      code: "INTERNAL_SERVER_ERROR",
                      message: "Failed to create Verification Token.",
                    });
                  }
                }
              );
            });
          } catch (error) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Failed to register user.",
            });
          }
        });
      });
    },
  })
  .mutation("forgotPassword", {
    input: z.object({
      email: z.string().email(),
    }),
    async resolve({ ctx, input }) {
      // Transporter for nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASS,
        },
      });

      // create forgot password token
      const forgotPasswordToken = uuidv4() + uuidv4();

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(
          forgotPasswordToken,
          salt,
          async (err, hashedForgotPasswordToken) => {
            try {
              const data = await ctx.prisma.forgotPasswordToken.create({
                data: {
                  expires: new Date(+new Date() + 30 * 60 * 1000),
                  token: hashedForgotPasswordToken,
                  user: {
                    connect: {
                      email: input.email,
                    },
                  },
                },
                include: {
                  user: true,
                },
              });
              const mailOptions = {
                to: input.email,
                subject: "ITBFood Change Password",
                html: `
              <a href=${
                process.env.BASE_URL +
                "/auth/" +
                data.user.username +
                "/password/" +
                forgotPasswordToken
              }>Click this link to change your password.</a>
              `,
              };
              transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                  throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to send change password email.",
                  });
                }
              });
            } catch (error) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create forgot password token.",
              });
            }
          }
        );
      });
    },
  })
  .mutation("changePassword", {
    input: z.object({
      userId: z.number(),
      username: z.string(),
      newPassword: z
        .string()
        .min(8, { message: "New Password at least 8 characters." }),
      confirmNewPassword: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check if newPassword equal to confirmNewPassword
      if (input.newPassword !== input.confirmNewPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "New Password and Confirm New Password must be same.",
        });
      }

      // change the password in db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(input.newPassword, salt, async (err, hashedPassword) => {
          try {
            await ctx.prisma.user.update({
              where: {
                username: input.username,
              },
              data: {
                hashedPassword,
              },
            });

            // delete forgotPassword token for corresponding user
            await ctx.prisma.forgotPasswordToken.delete({
              where: {
                userId: input.userId,
              },
            });
          } catch (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to change password.",
            });
          }
        });
      });
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getSecretMessage", {
    async resolve({ ctx }) {
      return "You are logged in and can see this secret message!";
    },
  });
