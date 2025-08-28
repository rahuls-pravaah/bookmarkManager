import React, {useState, useEffect, useContext} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BookmarkContext } from '../context/BookmarkContext';
import Login from '../components/Login';
import Home from '../components/Home';
import Signup from '../components/Signup';
import Dashboard from '../user/Dashboard';
import Navbar from '../components/Navbar';
import UserNav from '../user/UserNav';

function Router() {
  const {user, userData} = useContext(BookmarkContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user) navigate("/login");
  },[user])
  return (
    <>
    {
      user ? <UserNav /> : <Navbar />
    }
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
    </Routes>
    </>
  )
}

export default Router;
