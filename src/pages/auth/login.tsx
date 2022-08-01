import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  // router
  const router = useRouter();

  // trpc

  // react-hook-form
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // nextauth
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.error) {
      if (res.error === "NOT VERIFIED") {
        router.push(`/auth/send?user=${data.email}`);
      }
    } else {
      console.log("success");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          {...register("email", {
            required: "Email is required.",
            validate: {
              email: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Please fill a correct email address.",
            },
          })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />

        <button type="submit" className="bg-black text-white px-6 py-1">
          Submit
        </button>
      </form>

      <div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
      <Link href="/auth/password">
        <a className="text-blue-500 underline">Forgot Password</a>
      </Link>
    </>
  );
};

export default Login;
