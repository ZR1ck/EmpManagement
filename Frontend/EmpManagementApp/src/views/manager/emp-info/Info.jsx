import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmpDetail from './EmpDetail';
import EmpContacts from './EmpContacts';
import EmpWork from './EmpWork';
import LoadingScreen from '../../../components/Loading';
import ErrorPage from '../../../components/Error';

const Info = () => {

    const location = useLocation();

    const loading = false;
    const error = false;
    const [user, setUser] = useState(null);

    const [option, setOption] = useState('1');

    const optionChangeHandler = (option) => {
        setOption(option)
    }

    useEffect(() => {

    }, [])

    return (
        <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
            {/* Header */}
            <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Quản lí nhân viên</h1>
            {/* Divider */}
            <span className='w-full h-[2px] bg-gray-200'></span>

            <div className='mt-2 gap-4 flex flex-row overflow-auto'>
                {/* Sidebar */}
                <div className='border-r-[1.5px] border-gray-light w-1/5'>
                    <ul className='font-semibold text-gray-medium flex flex-col gap-8'>
                        <li className={`${option === '1' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''} hover:cursor-pointer`} onClick={() => optionChangeHandler('1')}>
                            Thông tin chi tiết
                        </li>

                        <li className={`${option === '2' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''} hover:cursor-pointer`} onClick={() => optionChangeHandler('2')}>
                            Liên lạc
                        </li>

                        <li className={`${option === '3' ? 'border-r-[6px] border-blue-medium pr-12 py-3' : ''} hover:cursor-pointer`} onClick={() => optionChangeHandler('3')}>
                            Công việc
                        </li>

                    </ul>
                </div>


                {/* body */}
                {loading ? (
                    <LoadingScreen />
                ) : error ? (<ErrorPage />) : (
                    <>
                        {option === '1' && (
                            <EmpDetail user={user} />
                        )}

                        {option === '2' && (
                            <EmpContacts user={user} />
                        )}

                        {option === '3' && (
                            <EmpWork user={user} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Info