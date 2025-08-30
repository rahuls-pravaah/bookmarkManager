import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { BookmarkContext } from '../context/BookmarkContext'

function Signup() {
  const {signup, errorFromContext} = useContext(BookmarkContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordValidation = (password) =>{
    const lenghtCheck = password.length >= 6;
    const capitalCheck = /[A-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const spacialCheck = /[^A-Za-z0-9]/.test(password);
    return lenghtCheck && capitalCheck && numberCheck && spacialCheck;
  }

  const signupHandler = (event) =>{
    event.preventDefault();
    setMessage("");
    setError("");

    if(fullname == ""){
      setError("Please fill fullname")
      return;
    }
    if(email == ""){
      setError("Please fill email")
      return;
    }
    if(password == ""){
      setError("Please fill password")
      return;
    }else if(password.length < 6){
      setError("Password length should be more than 6 character");
      return;
    }
    if(confirmPassword == ""){
      setError("Please fill confirmPassword")
      return;
    }
    if(password !== confirmPassword){
      setError("Password did not match");
      setTimeout(()=>{
        setError("");
      },5000)
      return;
    }
    if(passwordValidation(password)){
      const response = signup(fullname, email, password);
      setMessage(response.message);
    }else{
      setError(`Password does not meet all requirements
        At least 6 character
        At least one capital letter
        At least one number
        At least one special character`);
      return;
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
          Create an Account
        </h1>
        <form onSubmit={signupHandler} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
              className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullname"
              className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
              placeholder=" "
              required
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
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="peer w-full p-4 pt-6 font-light bg-white border border-gray-300 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-md text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Account
          </button>
        </form>

        {errorFromContext && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorFromContext}
          </div>
        )}
        {error && (
          <div className="flex justify-start items-start mt-4 p-3 bg-red-100 text-red-700 rounded-md whitespace-pre-line">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup
