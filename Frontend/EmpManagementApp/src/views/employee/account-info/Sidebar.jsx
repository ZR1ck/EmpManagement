import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({role, pathname}) => {

  useEffect(() => {
    console.log("role: ", role);
  }, [role])

  return (
    <div className='border-r-[1.5px] border-gray-light w-1/5'>
      <ul className='font-semibold text-gray-medium flex flex-col gap-8'>
        <Link to={`/${role}/account/detail`} key={1}>
          <li className={`${pathname === 'account-detail' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''}`}>
            Thông tin chi tiết
          </li>
        </Link>
        <Link to={`/${role}/account/contact`} key={2}>
          <li className={`${pathname === 'account-contact' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''}`}>
            Liên lạc
          </li>
        </Link>
        <Link to={`/${role}/account/work`} key={3}>
          <li className={`${pathname === 'account-work' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''}`}>
            Công việc
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Sidebar
