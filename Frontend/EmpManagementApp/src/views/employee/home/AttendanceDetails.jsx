import React from 'react'

const AttendanceDetails = () => {
    return (
        <div className='flex flex-col justify-around gap-2 py-2'>
            <div className='font-bold text-gray-medium text-[1.3rem]'>Chấm công</div>

            <div className='grid grid-cols-3 ml-5 justify-between text-[1.1rem] pr-5 gap-2'>
                <div className='font-medium text-gray-600'>Hôm nay</div>
                <div>In: <span className='font-medium text-gray-400'>5:00 AM</span></div>
                <div>Out: <span className='font-medium text-gray-400'>5:00 AM</span></div>

                <div className='font-medium text-gray-600'>Avg</div>
                <div>In: <span className='font-medium text-gray-400'>5:00 AM</span></div>
                <div>Out: <span className='font-medium text-gray-400'>5:00 AM</span></div>

            </div>
        </div>
    )
}

export default AttendanceDetails