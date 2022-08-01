import { GetServerSidePropsContext, NextPage } from "next";
import { prisma } from "../../server/db/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const SendNewVerificationToken: NextPage = () => {
  return <>Send New Verificaiton token.</>;
};
export default SendNewVerificationToken;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const email = ctx.query.user;

  if (!email) {
    return {
      notFound: true,
    };
  }

  // check if the verification token for current user is not exist
  const dataVt = await prisma.userVerificationToken.findMany({
    where: {
      user: {
        email: email as string,
      },
    },
  });

  if (dataVt.length !== 0) {
    return {
      notFound: true,
    };
  }

  // nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  // create new verification token
  const verificationToken = uuidv4() + uuidv4();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(
      verificationToken,
      salt,
      async (err, hashedVerificationToken) => {
        try {
          const user = await prisma.userVerificationToken.create({
            data: {
              expires: new Date(+new Date() + 30 * 60 * 1000),
              token: hashedVerificationToken,
              user: {
                connect: {
                  email: email as string,
                },
              },
            },
            include: {
              user: true,
            },
          });
          const mailOptions = {
            to: email,
            subject: "ITBFood Account Verification",
            html: `
              <a href=${
                process.env.BASE_URL +
                "/auth/" +
                user.user.username +
                "/verify/" +
                verificationToken
              }>Click this link to verify your account.</a>
              `,
          };
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              throw new Error("Failed to send verification email");
            }
          });
        } catch (error) {
          throw new Error("Failed to create verification token");
        }
      }
    );
  });

  return {
    props: {},
  };
}
