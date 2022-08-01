import { GetServerSidePropsContext, NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../../utils/trpc";
import { prisma } from "../../../../server/db/client";
import bcrypt from "bcryptjs";

interface IFormInput {
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordProps {
  username?: string;
  isExpires?: boolean;
  userId?: number;
}

const ChangePassword: NextPage = (props: ChangePasswordProps) => {
  // trpc
  const changePassword = trpc.useMutation(["auth.changePassword"], {
    onSuccess(data, variables, context) {
      console.log("Password changed.");
    },
  });

  // react-hook-form
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    changePassword.mutate({
      userId: props.userId as number,
      username: props.username as string,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
  };

  if (props.isExpires) {
    return (
      <>Token Expires. Please click forgot password again in login page.</>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New Password is required.",
          })}
        />

        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          type="password"
          {...register("confirmNewPassword", {
            required: "Confirm New Password is required.",
          })}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ChangePassword;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const username = ctx.params?.username as string;
  const forgotPasswordToken = ctx.params?.token as string;

  // check if the forgotPasswordToken exists
  const forgotPasswordTokenData = await prisma.forgotPasswordToken.findMany({
    where: {
      user: {
        username,
      },
    },
    select: {
      id: true,
      token: true,
      expires: true,
      user: true,
    },
  });

  const hashedForgotPasswordToken = forgotPasswordTokenData[0]?.token as string;
  const userId = forgotPasswordTokenData[0]?.user.id as number;

  if (!hashedForgotPasswordToken) {
    return {
      notFound: true,
    };
  }

  // check if the token valid
  const isValid = bcrypt.compareSync(
    forgotPasswordToken,
    hashedForgotPasswordToken
  );

  if (!isValid) {
    return {
      notFound: true,
    };
  }

  // check if the token expires or not
  let isExpires = false;
  const tokenExpireTime =
    forgotPasswordTokenData[0]?.expires.getTime() as number;
  if (new Date().getTime() > tokenExpireTime) {
    isExpires = true;
  }

  return {
    props: {
      username,
      isExpires: isExpires,
      userId,
    },
  };
}
