import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../server/env.mjs";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, _req) {
        // check if the user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          // check password
          const isPasswordValid = bcrypt.compareSync(
            credentials?.password as string,
            user.hashedPassword
          );

          if (isPasswordValid) {
            // check if user is verified.
            if (!user.isVerified) {
              await prisma.userVerificationToken.delete({
                where: {
                  userId: user.id,
                },
              });
              throw new Error("NOT VERIFIED");
            }
            return {
              username: user.username,
              email: user.email,
              role: user.role,
            };
          }
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 12,
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
