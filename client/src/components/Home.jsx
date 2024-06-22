import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>
  {
    if(!localStorage.getItem("token"))navigate("/login")
  },[])
  return (
    <div>Home</div>
  )
}

export default Home