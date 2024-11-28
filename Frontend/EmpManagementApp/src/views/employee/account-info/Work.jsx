import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import axios from 'axios';
import { formatDate } from '../../../utils/formatDate';
import { useAuthContext } from '../../../contexts/AuthProvider';
import LoadingScreen from '../../../components/Loading';
import ErrorPage from '../../../components/Error';

const InputField = ({ label, value, type }) => {
  return (
    <div className='flex flex-col w-fit'>
      <label className='font-medium text-gray-400'>{label}</label>
      <input type={type} value={value} className='outline-none w-fit py-[4px] text-gray-medium' readOnly={true} />
    </div>
  )
}

const Work = (userRole) => {

  const { user, loading, error } = useAuthContext();

  const [workInfo, setWorkInfo] = useState({
    employeeID: '',
    manager: '',
    department: '',
    position: '',
    startDay: '',
    workType: ''
  })

  const [manager, setManager] = useState(null);
  // const [error2, setError] = useState(null);


  useEffect(() => {
    const fetchManager = async (empId) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8080/api/employee/${empId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setManager(response.data);
      } catch (e) {
        // setError(e);
        console.error("Error fetching user data:", e);
      }
    };

    if (!loading && user && user.dept && user.dept.managerid && !manager) {
      fetchManager(user.dept.managerid);
    }

    if (manager) {
      setWorkInfo({
        employeeID: user.empid || '',
        manager: manager.name || '',
        department: user.dept.description || '',
        position: user.position || '',
        startDay: user.startdate ? formatDate(user.startdate, 1) : '',
        workType: user.jobtype || '',
      });
    }
  }, [loading, user, manager, userRole]);


  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter
    flex flex-col gap-4'>
      {/* Header */}
      <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Tài khoản</h1>
      {/* Divider */}
      <span className='w-full h-[2px] bg-gray-200'></span>
      {/* Info */}
      <div className='mt-2 gap-4 flex flex-row'>
        {/* Sidebar */}
        <Sidebar pathname='account-work' role={userRole.role} />
        {/* Content */}
        {loading ? (<LoadingScreen />) : error ? (<ErrorPage />) : (
          <div className='flex flex-col overflow-y-auto max-h-[550px] w-full gap-4 '>
            {/* Personal Info */}
            <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
              <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
                <h3>Chi tiết công việc</h3>
              </div>
              {/* Input Field */}
              <div className='mt-2 grid grid-cols-2 gap-6'>
                <InputField label="Mã nhân viên" value={workInfo.employeeID} type="text" />
                <InputField label="Quản lý" value={workInfo.manager} type="text" />
                <InputField label="Phòng ban" value={workInfo.department} type="text" />
                <InputField label="Vị trí" value={workInfo.position} type="text" />
                <InputField label="Ngày bắt đầu làm việc" value={workInfo.startDay} type="date" />
                <InputField label="Hình thức làm việc" value={workInfo.workType} type="text" />
              </div>
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default Work
