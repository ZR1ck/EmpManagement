import React, { useEffect, useRef, useState } from 'react';
import Notification from '../../../components/Notification';
import axios from 'axios';
import { useAuthContext } from '../../../contexts/AuthProvider';

export const LeaveRequest = () => {

    const { user } = useAuthContext();

    const [data, setData] = useState({
        annual: 0,
        marriage: 0,
        funeral: 0,
        sick: 0,
        unpaid: 0,
    })

    const [formData, setFormData] = useState({
        halfDaySelect: '1',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        leaveType: '0',
        reason: '',
        file: [],
    });

    // const [error2, setError] = useState(null);

    const [detailIsVisible, setDetailIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [showNotification, setShowNotification] = useState(false);
    const [success, setSuccess] = useState(false);

    const parentRef = useRef(null);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        window.addEventListener('resize', calculateNotificationPosition);
        return () => {
            window.removeEventListener('resize', calculateNotificationPosition);
        };
    }, []);

    useEffect(() => {
        // fetch data here
        const fetchData = async (empId, currentYear) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/leaveTypes/${empId}/${currentYear}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setData(response.data);
            } catch (e) {
                console.error("Error fetching leave info:", e);
                // setError("Không thể tải dữ liệu nghỉ phép");
            }
        };
        console.log(user);
        const empId = user.empid;  // or fetch dynamically
        const currentYear = new Date().getFullYear();
        fetchData(empId, currentYear);
    }, [user]);



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
            setFormData((prevData) => ({ ...prevData, file: [...files] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleRadioChange = (event) => {
        setFormData((prevData) => ({ ...prevData, halfDaySelect: event.target.value }));
    };

    const sendData = async () => {
        const data = new FormData();
        for (let i = 0; i < formData.file.length; i++) {
            data.append('files', formData.file[i]);
        }
        if (formData.file.length <= 0) data.append('files', null);
        const request = {
            createDate: new Date(),
            approvalStatus: 'Not yet approved',
            empId: user.empid,
            managerId: user.dept.managerid,
            startdate: formData.startDate,
            enddate: formData.endDate,
            reason: formData.reason,
            leavetype: stringifyLeaveTypes(formData.leaveType)
        }
        if (formData.halfDaySelect === '2') {
            request.starthour = formData.startTime;
            request.endhour = formData.endTime;
            request.enddate = request.startdate;
        }

        data.append('request', new Blob([JSON.stringify(request)], { type: "application/json" }));
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8080/api/${formData.halfDaySelect === '1' ? 'leaveRequest' : 'halfDayLeaveRequest'}`,
                data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            if (response.data) {
                console.log('Request sent successfully:', response.data);
                return true;
            } else {
                console.error('Error sending request:', response);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    const stringifyLeaveTypes = (leaveType) => {
        switch (leaveType) {
            case '1': return "Nghỉ hằng năm";
            case '2': return "Đám cưới";
            case '3': return "Đám tang";
            case '4': return "Nghỉ không lương";
            case '5': return "Nghỉ ốm";
            default: return '';
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        switch (formData.leaveType) {
            case '0':
                alert("Vui lòng chọn loại đơn yêu cầu.");
                return;
            case '1':
                if (data.annual <= 0) {
                    setMsg('Đã hết ngày nghỉ hằng năm')
                    setSuccess(false);
                    handleShowNotification();
                    return;
                }
                break;
            case '2':
                if (data.marriage <= 0) {
                    setMsg('Đã hết ngày nghỉ đám cưới')
                    setSuccess(false);
                    handleShowNotification();
                    return;
                }
                break;
            case '3':
                if (data.funeral <= 0) {
                    setMsg('Đã hết ngày nghỉ đám tang')
                    setSuccess(false);
                    handleShowNotification();
                    return;
                }
                break;
            case '4':
                if (data.unpaid <= 0) {
                    setMsg('Đã hết ngày nghỉ không trả lương')
                    setSuccess(false);
                    handleShowNotification();
                    return;
                }
                break;
            case '5':
                if (data.sick <= 0) {
                    setMsg('Đã hết ngày nghỉ ốm')
                    setSuccess(false);
                    handleShowNotification();
                    return;
                }
                break;
            default:
                break;
        }

        const res = await sendData();
        if (res) {
            setSuccess(true);
            setMsg("Gửi đơn thành công")
            handleShowNotification();
        }
        else {
            setMsg('Đã xảy ra lỗi')
            setSuccess(false);
            handleShowNotification();
        }

        // console.log(formData);
    };

    return (
        <div className='px-48' ref={parentRef}>
            {showNotification && (
                <>
                    <Notification
                        type={success ? "success" : "error"}
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
                <div className="text-gray-700 ms-2">Số phép nghỉ không lương: {data.unpaid}</div>
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
                            <option value='4'>Không lương</option>
                            <option value='5'>Nghỉ ốm</option>
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
                            multiple
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
