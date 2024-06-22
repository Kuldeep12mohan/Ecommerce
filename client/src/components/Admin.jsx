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
    <div className='min-h-screen p-4'>
      <div className='sticky top-0 flex bg-black justify-between items-center p-3 shadow-md rounded-lg w-full z-20'>
        <div className='flex'>
          <div></div>
          <div></div>
        </div>
      </div>

    </div>
  );
}
export default Admin
