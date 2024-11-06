import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className=''>
      <Sidebar/>
      <div className='bg-[#F1F1F1] w-screen h-screen pl-[300px] pr-4 py-4'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
