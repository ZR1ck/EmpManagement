import React from 'react'
import { HiMenuAlt1 } from "react-icons/hi";
import { SiTheboringcompany } from "react-icons/si";
import avatar from './../assets/avatar.jpg'
import { FiLogOut } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllNav } from '../navigation';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const pathName = useLocation();
  const basePath = pathName.pathname.split('/').slice(0, 3).join('/');

  const [allNav, setAllNav] = useState([]);

  const role = "employee";

  const userInfo = {
    userName: "Duc Huy",
    email: "huyduc480@gmail.com"
  }

  useEffect(() => {
    console.log(basePath)
  }, [basePath])

  useEffect(() => {
    const navs = getAllNav(role);
    setAllNav(navs);
  }, [role])

  return (
    <div className='fixed top-4 left-4 flex flex-col justify-between 
    bottom-4 bg-white w-64 rounded-lg'>
      {/* Sidebar */}
      <div className='flex flex-col px-4 py-2'>
        {/* Sidebar Header */}
        <div className='flex flex-row justify-between items-center'>
          <SiTheboringcompany
            style={{ fontSize: '5rem' }}
            className='cursor-pointer' />
          <HiMenuAlt1
            style={{ fontSize: "1.5rem" }}
            className='cursor-pointer' />
        </div>
        {/* Navigation */}
        <ul className='flex flex-col gap-3 mr-4'>
          {
            allNav.map((nav, i) => (
              <Link to={nav.path}>
                <li key={i} className={` ${nav.path.includes(basePath) && basePath !== '/' ? 'bg-blue-medium text-white' : 'text-gray-medium'} transition-colors cursor-pointer  rounded-lg flex flex-row items-center gap-4 px-2 
                font-semibold py-2 hover:bg-blue-medium hover:text-white`}>
                  <span>{nav.icon}</span>
                  <span>{nav.title}</span>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
      {/* Logout */}
      <div className='bg-[#F8F8FA] w-full h-16 flex flex-row items-center 
      justify-center gap-2 rounded-b-lg'>
        <img src={avatar} alt='avt-img' className='rounded-full w-10 h-10' />
        <div>
          <p className='text-[13px]'>{userInfo.userName}</p>
          <p className='text-gray-500 text-[10px]'>{userInfo.email}</p>
        </div>
        <FiLogOut className='text-gray-500 ml-4 cursor-pointer' />
      </div>
    </div>
  )
}

export default Sidebar
