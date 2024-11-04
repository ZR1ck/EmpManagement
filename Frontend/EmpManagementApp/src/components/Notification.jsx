import React from 'react';
import { ErrorIcon } from 'react-hot-toast';

const Notification = ({ message, onClose, position }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                transform: 'translate(-50%, -50%)',
            }}
            className="bg-white z-50 rounded-lg p-5 flex flex-col gap-4"
        >
            <div className='flex flex-row justify-start'>
                <ErrorIcon/>
                <p className='ms-2'>Lỗi</p>
            </div>
            <p className='z-50'>{message}</p>
            <button className="z-50 mt-2 p-2 w-1/2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300" onClick={onClose}>
                Xác nhận
            </button>
        </div>
    );
};

export default Notification;
