import React, { useState } from 'react'
import { LeaveRequest } from './LeaveRequest';

export const RequestForm = () => {

    const [selectedOption, setSelectedOption] = useState(0);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
            <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Gửi đơn yêu cầu</h1>
            {/* Divider */}
            <span className='w-full h-[2px] bg-gray-200'></span>

            <div className='container flex-col w-full overflow-x-hidden overflow-y-auto'>

                {/* dropdown */}
                <div className="flex items-center space-x-2 mb-8">
                    <label className="text-gray-700">Loại đơn yêu cầu:</label>
                    <select value={selectedOption}
                        onChange={handleSelectChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">

                        <option value='0' disabled>Chọn đơn yêu cầu</option>
                        <option value='1'>Đơn xin nghỉ phép</option>
                        <option value='2'>Đơn xin làm tại nhà</option>
                        <option value='3'>Đơn xin cập nhật chấm công</option>
                    </select>
                </div>

                {selectedOption === '1' && (
                    <LeaveRequest />
                )}

                {selectedOption === '2' && (
                    <div></div>
                )}

                {selectedOption === '3' && (
                    <div></div>
                )}

            </div>
        </div>
    )
}
