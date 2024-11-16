import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar';
import { isTokenExpired } from '../utils/tokenUtils';
import { jwtDecode } from 'jwt-decode';

const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    // const [roles, setRoles] = useState('');
    const roles = 'Manager'


    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token && !isTokenExpired(token)) {
    //         const roles = jwtDecode(token).roles.split(",")
    //         setRoles(roles);
    //     }
    // }, [])

    return (
        <div className=''>
            <Sidebar roles={roles} />
            <div className='bg-[#F1F1F1] w-screen h-screen pl-[300px] pr-4 py-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
