import React, {useState, useEffect, useContext} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BookmarkContext } from '../context/BookmarkContext';
import Login from '../components/Login';
import Home from '../components/Home';
import Signup from '../components/Signup';
import Dashboard from '../user/Dashboard';
import Navbar from '../components/Navbar';
import UserNav from '../user/UserNav';
import ForgetPassword from '../components/ForgetPassword';
import ListOfBugs from '../user/ListOfBugs';

function Router() {
  const {user, loading} = useContext(BookmarkContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!loading && user) navigate("/dashboard");
  },[user, loading])

  if(loading){
    return (
      <div>Loading...</div>
    )
  }
  return (
    <>
    {
      user ? <UserNav /> : <Navbar />
    }
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/forgetPassword' element={<ForgetPassword />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/list-of-bugs' element={<ListOfBugs />}/>
    </Routes>
    </>
  )
}

export default Router;
