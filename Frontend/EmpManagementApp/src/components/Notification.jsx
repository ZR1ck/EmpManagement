import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notification = ({ type, message, onClose, position }) => {
    // Determine icon based on the type
    const renderIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="text-green-500 text-2xl" />;
            case 'error':
                return <FaExclamationCircle className="text-red-500 text-2xl" />;
            case 'info':
                return <FaInfoCircle className="text-blue-500 text-2xl" />;
            case 'warning':
                return <FaExclamationTriangle className="text-yellow-500 text-2xl" />;
            default:
                return null;
        }
    };

    return (
        <div
            style={position ? {
                position: 'absolute',
                top: position.top,
                left: position.left,
                transform: 'translate(-50%, 0)',
            } : {}}
            className={`bg-white z-50 rounded-lg p-5 flex flex-col gap-4 shadow-md min-w-[300px] items-center
                ${position ? '' : 'relative mx-auto'}`}
        >
            <div className="flex flex-row items-center gap-2">
                {renderIcon()}
                <p className="font-semibold">{type}</p>
            </div>
            <p className="text-center mt-2">{message}</p>

            <button
                className="mt-2 p-2 w-1/2 bg-blue-600 text-white font-semibold rounded-md shadow 
                    hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={onClose}
            >
                Xác nhận
            </button>
        </div>
    );
};

export default Notification;
