import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookmarkContext } from "../context/BookmarkContext";

function Login() {
  const { user, login, loading, errorFromContext } =
    useContext(BookmarkContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for UI
  const [inputBorder, setInputBorder] = useState("");

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const loginHandler = (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
        <div className="flex bg-gray-100 sm:p-6">
          <div className="w-1/2 hidden md:flex">
            <img
              src="/image.png"
              alt="bookmark image"
              className="w-[34rem] h-[34rem] rounded-xl shadow-blue-700 shadow-2xl"
            />
          </div>
          <div className="flex items-center flex-col w-full md:w-1/2">
            <div className="bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:shadow-3xl">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-gray-500 mt-2 font-bold">
                  Log in to your account.
                </p>
              </div>

              <form onSubmit={loginHandler} className="flex flex-col gap-1">
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      required
                      onChange={(event) => setEmail(event.target.value)}
                      className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      required
                      onChange={(event) => setPassword(event.target.value)}
                      className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                      Password
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <NavLink
                  to="/forgetPassword"     
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline hover:cursor-pointer"
                  >
                    Forget Password
                  </NavLink>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-md text-white font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                </div>
              </form>
              {errorFromContext && (
                <div className="text-red-600 font-bold">{errorFromContext}</div>
              )}
              <div className="mt-6 text-center">
                <NavLink
                  to="/signup"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                  Create an account
                </NavLink>
              </div>
            </div>
          </div>
        </div>

  );
}

export default Login;
