import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Admin=()=> {
  const [count,setCount] = useState(0);
  const handleNotification = ()=>
  {
      setCount(0);
  }
  useEffect(() => {
    socket.on('newOrder', (order) => {
      alert(`${order} has placed an order`);
      setCount((prevCount) => prevCount + 1);
    });
    return () => {
      socket.off('newOrder');
    };
  }, []);

  return (
    <div className='flex justify-center text-3xl font-bold items-center h-screen'>
      <h1>Admin Page</h1>
      <button className='border m-4 bg-emerald-600 py-4 px-6' onClick={handleNotification}>Notification--{count}</button>
    </div>
  );
}
export default Admin
