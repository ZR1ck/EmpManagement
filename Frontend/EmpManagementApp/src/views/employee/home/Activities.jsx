import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Activities = ({ role }) => {
    return (
        <>
            <div className='flex flex-col w-full justify-around gap-2 py-2'>
                <div className='flex flex-row justify-between'>
                    <div className='font-bold text-gray-medium text-[1.3rem]'>Hoạt đông</div>
                    <Link to={`/${role}/activity`} className='flex flex-row items-center gap-2 text-gray-medium font-semibold hover:underline text-sm'>
                        <p>Đến</p>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Activities