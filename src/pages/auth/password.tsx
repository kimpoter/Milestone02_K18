import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";

interface IFormInput {
  email: string;
}

const ForgotPassword: NextPage = () => {
  // trpc
  const forgotPassword = trpc.useMutation(["auth.forgotPassword"], {
    onSuccess(data, variables, context) {
      console.log("Password changed.");
    },
  });

  // react-hook-form
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    forgotPassword.mutate({
      email: data.email,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default ForgotPassword;
