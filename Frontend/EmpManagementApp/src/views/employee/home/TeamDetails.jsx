import React from 'react'

const TeamDetails = () => {
  return (
    <div className="flex flex-row justify-evenly w-full items-center">
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Tổng nhân viên</div>
        <div className='font-bold text-gray-700 text-[2rem]'>100</div>
      </div>
      <div className="border-r-[1.5px] border-gray-light h-12"></div>
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Có mặt</div>
        <div className='font-bold text-gray-700 text-[2rem]'>100</div>
      </div>
      <div className="border-r-[1.5px] border-gray-light h-12"></div>
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Xin nghỉ</div>
        <div className='font-bold text-gray-700 text-[2rem]'>0</div>
      </div>
    </div>
  )
}

export default TeamDetails