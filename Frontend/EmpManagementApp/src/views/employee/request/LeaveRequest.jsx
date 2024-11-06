import React, { useEffect, useRef, useState } from 'react';
import Notification from '../../../components/Notification';

export const LeaveRequest = () => {

    const data = {
        annual: 0,
        marriage: 2,
        funeral: 3,
        sick: 4,
        nopaid: 5,
    }

    const [formData, setFormData] = useState({
        halfDaySelect: '1',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        leaveType: '0',
        reason: '',
        file: null,
    });

    const [detailIsVisible, setDetailIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [showNotification, setShowNotification] = useState(false);

    const parentRef = useRef(null);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });
    const [msg, setMsg] = useState('')

    useEffect(() => {
        window.addEventListener('resize', calculateNotificationPosition);
        return () => {
            window.removeEventListener('resize', calculateNotificationPosition);
        };
    }, []);

    useEffect(() => {
        // fetch data here
    }, [])

    const calculateNotificationPosition = () => {
        if (parentRef.current) {
            const rect = parentRef.current.getBoundingClientRect();
            const top = rect.top + window.scrollY + rect.height / 2;
            const left = rect.left + window.scrollX + rect.width / 2;
            setNotificationPosition({ top, left });
        }
    };

    const handleShowNotification = () => {
        calculateNotificationPosition();
        setShowNotification(true);
    };

    const handleMouseMove = (e) => {
        setPosition({
            top: e.clientY + 10,
            left: e.clientX + 10,
        });
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, file: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleRadioChange = (event) => {
        setFormData((prevData) => ({ ...prevData, halfDaySelect: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        switch (formData.leaveType) {
            case '0':
                alert("Vui lòng chọn loại đơn yêu cầu.");
                return;
            case '1':
                if (data.annual <= 0) {
                    setMsg('Đã hết ngày nghỉ hằng năm')
                    handleShowNotification();
                    return;
                }
                break;
            case '2':
                if (data.marriage <= 0) {
                    setMsg('Đã hết ngày nghỉ đám cưới')
                    handleShowNotification();
                    return;
                }
                break;
            case '3':
                if (data.funeral <= 0) {
                    setMsg('Đã hết ngày nghỉ đám tang')
                    handleShowNotification();
                    return;
                }
                break;
        }
        alert('submitted');
        console.log(formData);
    };

    return (
        <div className='px-48' ref={parentRef}>
            {showNotification && (
                <>
                    <Notification
                        message={msg}
                        onClose={() => setShowNotification(false)}
                        position={notificationPosition}
                    />
                    <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setShowNotification(false)}></div>
                </>
            )}

            <div className='flex flex-col gap-4 items-center'>
                <span className='w-1/2 h-[2px] bg-gray-200 mb-7'></span>
                <div className='text-[2.5rem] text-gray-medium text-2xl font-bold'>Đơn xin nghỉ phép</div>
            </div>

            <form className='flex flex-col gap-4 px-10 my-10 w-full' onSubmit={handleSubmit}>
                <div className="text-gray-700 ms-2"
                    onMouseEnter={() => setDetailIsVisible(true)}
                    onMouseLeave={() => setDetailIsVisible(false)}
                    onMouseMove={handleMouseMove}>
                    Số phép nghỉ có lương: {data.annual + data.marriage + data.funeral}
                </div>
                {detailIsVisible && (
                    <div
                        className="absolute z-10 p-2 text-white bg-gray-800 rounded-md shadow-lg"
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                    >
                        <div>Nghỉ hằng năm: {data.annual}</div>
                        <div>Nghỉ cưới: {data.marriage}</div>
                        <div>Nghỉ tang: {data.funeral}</div>
                    </div>
                )}
                <div className="text-gray-700 ms-2">Số phép nghỉ không lương: {data.nopaid}</div>
                <div className="text-gray-700 ms-2">Số phép nghỉ ốm: {data.sick}</div>

                <div className="flex justify-end space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="halfDaySelect"
                            value="1"
                            className="mr-2"
                            checked={formData.halfDaySelect === '1'}
                            onChange={handleRadioChange}
                        /> Nghỉ cả ngày
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="halfDaySelect"
                            value="2"
                            className="mr-2"
                            checked={formData.halfDaySelect === '2'}
                            onChange={handleRadioChange}
                        /> Nghỉ nữa ngày
                    </label>
                </div>

                {formData.halfDaySelect === '1' && (
                    <div className='flex flex-row gap-4 justify-between'>
                        <div className="w-full max-w-xs">
                            <label htmlFor="start-date" className="text-gray-700 ms-2">Từ ngày</label>
                            <input
                                type="date"
                                id="start-date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label htmlFor="end-date" className="text-gray-700 ms-2">Đến ngày</label>
                            <input
                                type="date"
                                id="end-date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                )}

                {formData.halfDaySelect === '2' && (
                    <div className='flex flex-row gap-4 justify-between'>
                        <div className="w-full max-w-xs">
                            <label htmlFor="single-date" className="text-gray-700 ms-2">Ngày</label>
                            <input
                                type="date"
                                id="single-date"
                                name="startDate" // Reusing startDate for single date
                                value={formData.startDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label htmlFor="start-time" className="text-gray-700 ms-2">Từ giờ</label>
                            <input
                                type="time"
                                id="start-time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label htmlFor="end-time" className="text-gray-700 ms-2">Đến giờ</label>
                            <input
                                type="time"
                                id="end-time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                )}

                <div className='flex flex-row gap-4 justify-end'>
                    <div className="flex items-center space-x-2 mb-8">
                        <label className="text-gray-700 ms-2">Loại đơn yêu cầu:</label>
                        <select
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value='0' disabled>Chọn loại nghỉ phép</option>
                            <option value='1'>Nghỉ hằng năm</option>
                            <option value='2'>Đám cưới</option>
                            <option value='3'>Đám tang</option>
                        </select>
                    </div>
                </div>

                <div className="text-gray-700 ms-2">Lý do xin nghỉ:</div>
                <textarea
                    rows="10"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập lý do xin nghỉ..."
                    required
                />

                <div className="flex justify-between space-x-4">
                    <div className="w-full max-w-md">
                        <input
                            type="file"
                            onChange={handleChange}
                            name="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <button type="submit" className="w-1/6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                        Gửi
                    </button>
                </div>
            </form>

        </div>
    );
};
