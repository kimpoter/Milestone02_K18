import { GetServerSidePropsContext, NextPage } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../server/db/client";

interface VerifyUserAccountProps {
  isExpires?: boolean;
}

const VerifyUserAccount: NextPage = (props: VerifyUserAccountProps) => {
  if (props.isExpires) {
    return <>Token Expires.</>;
  }
  return <>Account verified.</>;
};

export default VerifyUserAccount;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const verificationToken = ctx.params?.token as string;
  const username = ctx.params?.username as string;

  // check if the token exist on db
  const data = await prisma.userVerificationToken.findMany({
    where: {
      user: {
        username,
      },
    },
    select: {
      id: true,
      token: true,
      expires: true,
    },
  });

  const hashedVerificationToken = data[0]?.token as string;

  if (!hashedVerificationToken) {
    return {
      notFound: true,
    };
  }

  // check if token valid
  const isValid = bcrypt.compareSync(
    verificationToken,
    hashedVerificationToken
  );

  if (!isValid) {
    return {
      notFound: true,
    };
  }

  // delete the verification token from db
  await prisma.userVerificationToken.delete({
    where: {
      id: data[0]?.id as number,
    },
  });

  // check if the token expire or not
  let isExpires = false;
  const tokenExpireTime = data[0]?.expires.getTime() as number;
  if (new Date().getTime() > tokenExpireTime) {
    // delete user account from db
    await prisma.user.delete({
      where: {
        username,
      },
    });

    isExpires = true;
  } else {
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        isVerified: true,
      },
    });
  }

  return {
    props: {
      isExpires,
    },
  };
}
