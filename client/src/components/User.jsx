import React, { useState } from 'react'
import axios from "axios"
const User = () => {
  const [user,setUser] = useState('');
  const sendNotification = async()=>
  {
    const response = await axios.post("http://localhost:3001/api/v1/users/orders",{user});
    console.log("response",response);
    setUser('')
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <input type="text" placeholder='enter user' className='border py-3 px-5'
      onChange={(e)=>setUser(e.target.value)} value={user} />
      <button className='py-3 px-6 border bg-purple-500 m-4 font-bold' onClick={sendNotification} >Send Notification</button>
    </div>
  )
}

export default User