import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookmarkContext } from "../context/BookmarkContext";

function Login() {
  const {user, login, loading} = useContext(BookmarkContext);
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
    <div className="flex flex-col justify-center items-center">
      <div className="text-xl font-bold p-2">
        <h1>Login</h1>
      </div>
      <form
        onSubmit={loginHandler}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              name="email"
              onChange={(event)=>setEmail(event.target.value)}
              className="border p-1 rounded outline-none"
            />
          </div>
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(event)=>setPassword(event.target.value)}
              className="border p-1 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="p-4 bg-blue-600 rounded-md hover:cursor-pointer hover:bg-blue-500 font-bold text-white "
            >
              Login
            </button>
          </div>
          <div>
            <NavLink
              to="/signup"
              className="text-blue-700 hover:cursor-pointer"
            >
              Create an account
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
