import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5';
import RequestView from './Reward/RequestView';
import ListView from './Reward/ListView';

const RewardPage = () => {

    const [isListView, setIsListView] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleViewChange = () => {
        setIsListView(!isListView);
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className='bg-white rounded-lg w-full h-full py-6 px-6 font-inter 
        flex flex-col gap-6 overflow-y-auto'>
            <div className='flex flex-row justify-between'>
                {/* Header */}
                <h1 className='font-semibold text-2xl text-gray-medium '>
                    QUẢN LÍ KHEN THƯỞNG
                </h1>
                <div className='flex flex-row gap-4'>
                    <button className={isListView ?
                        'border-gray-medium px-4 py-1 rounded-md text-sm font-semibold text-white hover:bg-blue-700 transition-colors bg-blue-medium' :
                        'border-gray-medium px-4 py-1 border-2 rounded-md text-sm  font-semibold text-gray-medium hover:bg-gray-200 transition-colors'
                    }
                        onClick={handleViewChange}>
                        DANH SÁCH
                    </button>
                    <button className={!isListView ?
                        'border-gray-medium px-4 py-1 rounded-md text-sm font-semibold text-white hover:bg-blue-700 transition-colors bg-blue-medium' :
                        'border-gray-medium px-4 py-1 border-2 rounded-md text-sm  font-semibold text-gray-medium hover:bg-gray-200 transition-colors'
                    }
                        onClick={handleViewChange}>
                        YÊU CẦU
                    </button>
                    <div className='flex flex-row items-center gap-2 border-2 border-gray-300 px-2 rounded-sm'>
                        <div className='h-full rounded-s-md flex justify-center py-[2px] items-center text-gray-500 text-xl'>
                            <IoSearchSharp />
                        </div>
                        <input
                            placeholder='Tìm kiếm'
                            className='outline-none text-sm placeholder:text-sm w-[250px]'
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div className='flex'>
                <span className='w-full h-[1.4px] bg-gray-300'></span>
            </div>

            <div className='w-full h-full py-6 px-6 font-inter flex flex-col gap-6 overflow-y-auto'>
                {isListView ? <ListView searchTerm={searchTerm.trim()} /> : <RequestView searchTerm={searchTerm.trim()}/>}
            </div>
        </div>
    )
}

export default RewardPage