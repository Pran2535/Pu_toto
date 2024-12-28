import React from 'react'
import Logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div className="">
        <img src={Logo} className='w-16 mb-10'/>
      <form>
      <h3 className='text-lg font-medium mb-2'>What's your email</h3>
      <input 
      required 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="email"
       placeholder="Pranav@example.com"/>
      <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
      <input 
      className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      required type="password" placeholder="password"/>
      <button
      className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>
    
      </form>
      <p className='text-center'> New here? <Link  to={'/signup'} className='text-blue-600'>Create new Account</Link></p> 
      </div>
      <div className="">
        <button className='bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</button>
      </div>
    </div>
  )
}

export default UserLogin
