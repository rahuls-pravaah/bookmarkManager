import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookmarkContext } from "../context/BookmarkContext";

function Login() {
  const {user, login, loading, errorFromContext} = useContext(BookmarkContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

  if(loading){
    return(
      <div>Loading...</div>
    )
  }

  return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to your account.</p>
        </div>
        
        <form onSubmit={loginHandler} className="space-y-6">
          <div className="relative">
            {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label> */}
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
          
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md text-white font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        {
          errorFromContext && <div className="text-red-600 font-bold">{errorFromContext}</div>
        }
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
  );
}

export default Login;
