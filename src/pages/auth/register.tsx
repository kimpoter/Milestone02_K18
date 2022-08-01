import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  // trpc
  const registerUser = trpc.useMutation(["auth.register"], {
    onSuccess(data, variables, context) {
      console.log("success register.");
    },
  });

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    registerUser.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />

        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;
