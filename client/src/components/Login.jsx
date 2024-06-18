import React from 'react';
import logo from '../assets/logo.webp';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate =useNavigate();
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='border-4 p-5 shadow-md flex justify-around rounded-lg'>
        <div className='w-full md:w-1/2'>
        <div className='text-3xl mb-4 font-bold'>Login</div>
      <div className='py-3'>Doesn't have an account yet?<a onClick={()=>
        {
          navigate("/signup")
        }
      }    className='text-purple-600 font-bold underline'>Sign Up</a></div>
      <label htmlFor="email" className='block py-3'>Email Address</label>
      <input type="text" name='email' placeholder='you@example.com'className='w-full md:w-3/4 border py-2 px-2 rounded-lg'/>
      <div className='flex justify-between w-full md:w-3/4'>
      <label htmlFor="password"className='py-2' >Password
      </label>
      <a href="#" className='text-purple-500 font-bold underline py-2'>Forgot password?</a>
      </div>
      <div className='flex justify-between mb-3'>
      <input type="password" placeholder='Enter 6 characters or more' className='w-full md:w-3/4 border py-2 px-2 rounded-lg'/>
      </div>
      <input type="checkbox" name="remember" id="rem" className='m-2'/>
      <label htmlFor="remember" className='py-2 px-3 mt-5'>
        Remember me
      </label>
      <br />
      <button className='w-full md:w-3/4 py-2 mt-5  border-2 bg-purple-500 text-white font-bold hover:bg-purple-300 transition ease-linear duration-30' onClick={()=>
        {
          navigate("/")
        }
      }>Login</button>
        </div>
      <div className='hidden md:block'>
        <img src={logo} alt="" />
      </div>
    </div>
    </div>
  )
}

export default Login