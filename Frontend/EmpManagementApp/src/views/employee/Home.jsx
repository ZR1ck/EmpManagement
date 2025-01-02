import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthProvider';
import avatar from './../../assets/avatar.jpg'
import { fetchImage } from '../../utils/imageUtils';
import LoadingScreen from '../../components/Loading';
import ErrorPage from '../../components/Error';
import AttendanceDetails from './home/AttendanceDetails';
import WorkDetails from './home/WorkDetails';
import RequestDetails from './home/RequestDetails';
import Activities from './home/Activities';
import TeamDetails from './home/TeamDetails';
import EmpRequestDetails from './home/EmpRequestDetails';

const Home = ({ role }) => {

  const [userInfo, setUserInfo] = useState({
    name: '',
    userRole: role,
  });

  const host = process.env.REACT_APP_API_URL;
  const [imageSrc, setImageSrc] = useState(null);
  const { user, loading, error, getToken } = useAuthContext();

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    if (!loading && user) {
      setUserInfo({
        name: user.name || '',
        userRole: role,
      });
      fetchImage(host + user.avatarurl)
        .then(setImageSrc)
    }
  }, [loading, user, role, host, getToken])

  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter
    flex flex-col gap-4'>
      {/* Header */}
      <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Trang chủ</h1>
      {/* Divider */}
      <span className='w-full h-[2px] bg-gray-200'></span>
      {/* Info */}
      {loading ? (
        <LoadingScreen />
      ) : error ? (<ErrorPage />) : (
        <>
          <div className='flex flex-row border-[1px] border-gray-light w-full pl-10 pr-4 py-2 
          rounded-lg justify-between'>
            <div className='flex flex-row gap-6 items-center'>
              <img src={imageSrc || avatar} alt='img-avatar' className='w-20 h-20 rounded-full' onError={(e) => e.target.src = avatar} />
              <div className='flex flex-col gap-2'>
                <span className='font-semibold text-[1.5rem] text-gray-medium'>
                  Welcome back, {userInfo.name}!
                </span>
                <span className='text-[1.2rem] text-gray-medium font-light'>

                </span>
              </div>
            </div>
          </div>

          <div className='flex flex-row border-[1px] border-gray-light w-full pl-4 pr-4 mr-10 py-2 rounded-lg justify-between'>
            <WorkDetails role={role} />
          </div>

          <div className='flex flex-row justify-between'>
            {role === 'employee' && (<>
              <div className='flex flex-row border-[1px] border-gray-light w-3/5 pl-4 pr-4 mr-10 py-2 rounded-lg justify-between'>
                <EmpRequestDetails />
              </div>
            </>)}
            {role === 'manager' && (<>
              <div className='flex flex-row border-[1px] border-gray-light w-3/5 pl-4 pr-4 mr-10 rounded-lg justify-between'>
                <TeamDetails />
              </div>
            </>)}

            <div className='flex flex-col border-[1px] border-gray-light w-2/5 pl-4 pr-4 py-2 rounded-lg justify-between'>
              <AttendanceDetails />
            </div>
          </div>

          <div className='flex flex-row justify-between'>

            {role === 'manager' && (<>
              <div className='flex flex-row border-[1px] border-gray-light w-3/5 pl-4 pr-4 mr-10 py-2 rounded-lg justify-between'>
                <RequestDetails />
              </div>
            </>)}

            <div className={`flex flex-col border-[1px] border-gray-light ${role === 'manager' ? 'w-2/5' : 'w-full'} pl-4 pr-4 py-2 rounded-lg justify-between`}>
              <Activities role={role} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
