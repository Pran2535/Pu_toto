import React, { useState } from 'react'
import Logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
const CaptainSignup = () => {
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [userData,setUserData] = useState({})
  const submitHandler=(e)=>{
e.preventDefault();
setUserData({
  fullName:{
    firstname:firstname,
    lastname:lastname
  },
  
  email:email,
  password:password
})
console.log(userData);

setEmail('');
setPassword('');
setFirstname('');
setLastname('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div className="">
        <img src={Logo} className='w-16 mb-10'/>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's our captain name</h3>
          <div className="flex gap-4 mb-5">
           <input 
      required 
      
      className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
      type="text"
       placeholder="First name"
       value={firstname}
        onChange={(e)=>setFirstname(e.target.value)}
       />
       
         <input 
      required 
      
      className='bg-[#eeeeee]   rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
      type="text"
       placeholder="last name"
       value={lastname}
        onChange={(e)=>setLastname(e.target.value)}
       />
       
       </div>
      <h3 className='text-lg font-medium mb-2'>What's our captain email</h3>
      <input 
      required 
      value={email}
        onChange={(e)=>setEmail(e.target.value)}
      className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      type="email"
       placeholder="Pranav@example.com"/>
      <h3 className='text-base font-medium mb-2'>Enter Password</h3>
      <input 
      value={password}
        onChange={(e)=>setPassword(e.target.value)}
      className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
      required type="password" placeholder="password"/>
      <button
      className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
      >Register</button>
    
      </form>
      <p className='text-center'> Already have an account? <Link  to={'/captain-login'} className='text-blue-600'>Login here </Link></p> 
      </div>
      <div className="">
        <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy </span> and terms of service apply  </p>
      </div>
    </div>
  )
}

export default CaptainSignup
