import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { BookmarkContext } from '../context/BookmarkContext'

function Signup() {
  const {signup} = useContext(BookmarkContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
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
    }
    if(confirmPassword == ""){
      setError("Please fill confirmPassword")
      return;
    }
    const response = signup(fullname, email, password);
    console.log(response);
    setMessage(response.message);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-xl font-bold p-2">
        <h1>Signup</h1>
      </div>
      <form onSubmit={signupHandler} className="flex justify-center items-center">
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="fullname" className="">Full Name</label>
            <input type="text" value={fullname} onChange={(event)=>setFullname(event.target.value)} id="fullname" name="fullname" className="border p-1 rounded outline-none"/>
          </div>
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="email" className="">Email</label>
            <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} id="email" name="email" className="border p-1 rounded outline-none"/>
          </div>
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} id="password" className="border p-1 rounded" />
          </div>
          <div className="flex justify-between items-baseline gap-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} id="confirmPassword" className="border p-1 rounded" />
          </div>
          <div>
            <button type="submit" className="p-4 bg-blue-600 rounded-md hover:cursor-pointer hover:bg-blue-500  text-white ">Create</button>           
          </div>
        </div>
      </form>
      {
        error && <div>{error}</div>
      }
      {
        message && <div>{message}</div>
      }
    </div>
  )
}

export default Signup
