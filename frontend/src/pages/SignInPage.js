import { Link } from "react-router-dom";
import React from "react";

// TODO: buat components Form
function SignInPage() {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  function onSubmit() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log("Email : ", email);
    console.log("Password : ", password);
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)]">
      <div className="card">
        <h1 className="sm:text-3xl text-2xl font-semibold text-center mb-12">
          Sign In
        </h1>
        <form className="sm:text-lg text-base" onSubmit={onSubmit}>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              type="email"
              required
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input
              type="password"
              required
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2"
              ref={passwordRef}
            />
          </div>
          <p className="text-sm opacity-50">
            Belum punya akun?{" "}
            <Link to="/signup" className="hover:underline text-sm">
              Sign up
            </Link>
          </p>
          <div className="w-full flex justify-center mt-12">
            <button
              type="submit"
              className="btn-primary sm:text-lg text-base w-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
