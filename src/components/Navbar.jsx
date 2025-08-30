import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='sticky top-0 z-50 flex justify-center items-center bg-blue-400'>
      <div className='flex gap-4 p-1 font-bold'> 
        <NavLink to="/" className="text-white border rounded-md p-2 hover:bg-blue-600 shadow-xl">Home</NavLink>
        <NavLink to="/login" className="text-white border rounded-md p-2 hover:bg-blue-600 shadow-xl">Login</NavLink>
      </div>
    </div>
  )
}

export default Navbar
