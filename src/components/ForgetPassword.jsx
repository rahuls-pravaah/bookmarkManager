import React, { useState, useRef, useEffect, useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const { sendResetPasswordLink, errorFromContext } =
    useContext(BookmarkContext);
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const sendResetLinkHandler = () => {
    if (email === "") {
      setError("Email required");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const response = sendResetPasswordLink(email);
    response.then((data) => {
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
        navigate("/login")
      }, 5000);
    });
    if (errorFromContext) {
      setError(errorFromContext);
      return;
    }
  };

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="flex h-screen bg-gray-100 sm:p-6">
      <div className="flex items-center flex-col w-full">
        <div className="bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:shadow-3xl">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Reset Password
            </h1>
          </div>

          <div className="flex flex-col gap-1">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  ref={inputRef}
                  className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Email*
                </label>
              </div>
            </div>
            <div className="">
              <button
                type="button"
                onClick={sendResetLinkHandler}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:cursor-pointer "
              >
                Send Reset Link
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-500 text-sm">{message}</p>}
            </div>

            <div className="mt-5"></div>
          </div>

          <div className="mt-6 text-center"></div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
