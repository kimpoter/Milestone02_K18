import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { showNotification } from "@mantine/notifications";

function SignUpPage() {
  const usernameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPWRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPWRef.current.value;

    setLoading(true);

    axios
      .post(
        `/auth/signup`,
        JSON.stringify({ username, email, password, confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.tokens.access_token);
        setCurrentUser({ loggedIn: true });
        setLoading(false);
        showNotification({
          title: "Success",
          message: "Successfully Signed Up",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "green" },
            },
          }),
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: "Something went wrong. Failed to sign up",
          styles: () => ({
            root: {
              "&::before": { backgroundColor: "red" },
            },
          }),
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)]">
      <div className="card">
        {!loading ? (
          <>
            <h1 className="sm:text-3xl text-2xl font-semibold text-center mb-12">
              Sign Up
            </h1>
            <form
              className="sm:text-lg text-base"
              onSubmit={handleSubmit}
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
                  min={8}
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
          </>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="loading-spinner" />
            <p>Submitting data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
