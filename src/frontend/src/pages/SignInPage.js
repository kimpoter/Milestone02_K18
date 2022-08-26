import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignInPage() {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(JSON.stringify({ email, password }));

    setLoading(true);
    axios
      .post(`/auth/signin`, JSON.stringify({ email, password }))
      .then((res) => {
        console.log(res);
        localStorage.setItem("ACCESS_TOKEN", res.data.tokens.access_token);
        setCurrentUser({ loggedIn: true });
        setLoading(false);
        navigate("/", { replace: true });
      }) // error handling
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-104px)]">
      <div className="card">
        {!loading ? (
          <>
            <h1 className="sm:text-3xl text-2xl font-semibold text-center mb-12">
              Sign In
            </h1>
            <form
              className="sm:text-lg text-base"
              onSubmit={handleSubmit}
              disabled={loading}
            >
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

export default SignInPage;
