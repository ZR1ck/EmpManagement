import React from 'react'

const WorkDetails = () => {



    return (
        <div className="flex flex-row justify-evenly w-full items-center">
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số ngày làm việc</div>
                <div className='font-bold text-gray-700 text-[2rem]'>100</div>
            </div>
            <div className="border-r-[1.5px] border-gray-light h-12"></div>
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số ngày đã nghỉ</div>
                <div className='font-bold text-gray-700 text-[2rem]'>100</div>
            </div>
            <div className="border-r-[1.5px] border-gray-light h-12"></div>
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số hoạt động đã tham gia</div>
                <div className='font-bold text-gray-700 text-[2rem]'>100</div>
            </div>
        </div>

    )
}

export default WorkDetails