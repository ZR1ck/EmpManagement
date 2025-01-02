import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const RequestDetails = () => {
    return (
        <>
            <div className='flex flex-col w-full justify-around gap-2 py-2'>
                <div className='flex flex-row justify-between'>
                    <div className='font-bold text-gray-medium text-[1.3rem]'>Đơn yêu cầu</div>
                    <Link to={`/manager/request`} className='flex flex-row items-center gap-2 text-gray-medium font-semibold hover:underline text-sm'>
                        <p>Đến</p>
                        <FaArrowRight />
                    </Link>
                </div>

                <div className='grid grid-cols-2 ml-5 justify-between text-[1.1rem] pr-5 gap-2'>
                    <div className='font-medium text-gray-600'>Đã nhận: </div>
                    <div className='font-medium text-gray-400'>100</div>

                    <div className='font-medium text-gray-600'>Đã duyệt: </div>
                    <div className='font-medium text-gray-400'>100</div>

                    <div className='font-medium text-gray-600'>Chưa duyệt: </div>
                    <div className='font-medium text-gray-400'>100</div>

                </div>
            </div>
        </>
    )
}

export default RequestDetails