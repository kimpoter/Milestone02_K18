import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../api/axios";

const REGISTER_URL = `/auth/signup`;
function SignUpPage() {
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPWRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPWRef.current.value;

    setLoading(true);
    try {
      const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password, confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (err) {
      if (!err?.res) {
        console.log("No Server Response");
      } else if (err.res?.status === 409) {
        console.log("Username Taken");
      } else {
        console.log("Registration Failed");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)]">
      <div className="card">
        <h1 className="sm:text-3xl text-2xl font-semibold text-center mb-12">
          Sign Up
        </h1>
        <form
          className="sm:text-lg text-base"
          onSubmit={onSubmit}
          disabled={loading}
        >
          <div className="flex flex-col mb-4">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-input"
              ref={usernameRef}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-input"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-input"
              ref={passwordRef}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              className="form-input"
              ref={confirmPWRef}
            />
          </div>
          <p className="text-sm opacity-50">
            Sudah punya akun?{" "}
            <Link to="/signin" className="hover:underline text-sm">
              Sign in
            </Link>
          </p>
          <div className="w-full flex justify-center mt-12">
            <button
              type="submit"
              className="btn-primary sm:text-lg text-base w-full"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
