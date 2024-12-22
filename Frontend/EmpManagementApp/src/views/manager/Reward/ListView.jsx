import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaDownload, FaEye } from 'react-icons/fa6';
import { formatDate, getCurrentMonthYear } from '../../../utils/formatDate';
import { FaEdit, FaEllipsisH } from "react-icons/fa";
import { useAuthContext } from '../../../contexts/AuthProvider';
import { getReward, getRewardPDF } from '../../../api/reward';
import ErrorPage from '../../../components/Error';
import LoadingScreen from '../../../components/Loading';
import { IoSearchSharp } from 'react-icons/io5';
import Notification from '../../../components/Notification';

const ListView = ({ searchTerm }) => {

    const [columns] = useState([
        { id: 1, name: "empName", value: "Tên nhân viên", width: "40%" },
        { id: 2, name: "lastUpdate", value: "Ngày Cập nhật cuối", width: "35%" },
        { id: 3, name: "action", value: "Action", width: "25%" },
    ]);


    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [date, setDate] = useState(getCurrentMonthYear());
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clickedItem, setClickedItem] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });
    const parentRef = useRef(null);
    const [msg, setMsg] = useState("");

    const { user, getToken } = useAuthContext();

    const handleActionClick = (event, id) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        const menuWidth = 150;
        setMenuPosition({ x: clientX - menuWidth, y: clientY });
        setMenuVisible(!menuVisible);
        setClickedItem(id);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };


    const handleDownload = async () => {
        if (clickedItem) {
            const token = getToken();
            if (!token || !user) return;
            await getRewardPDF(token, [clickedItem], user.empid);
        }
    }

    const handleMultiDownload = async () => {
        if (filteredData.length > 0) {
            console.log('downloading...')
            const token = getToken();
            if (!token || !user) return;
            const filteredDataIDs = filteredData.map(item => item.id);
            await getRewardPDF(token, filteredDataIDs, user.empid);
            setShowNotification(false);
        }
    }

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
        setMsg(`Tải tất cả ${filteredData.length} file ?`)
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setDate(value);
        if (value) {
            const [selectedYear, selectedMonth] = value.split("-");
            setYear(selectedYear);
            setMonth(selectedMonth);
        } else {
            setYear("");
            setMonth("");
        }
    };

    const fetchData = useCallback(async () => {
        const token = getToken();
        if (!token || !user) return;
        try {
            const response = await getReward(token, year, month, user.empid);
            if (response.data) {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
                setError(null);
            }
        }
        catch (e) {
            setError(e);
            setLoading(false);
        }
    }, [getToken, user, year, month])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        if (searchTerm && data.length > 0) {
            setFilteredData(data.filter(item =>
                item.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.dateAwarded.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
        else {
            setFilteredData(data)
        }
    }, [searchTerm, data])

    useEffect(() => {
        window.addEventListener('resize', calculateNotificationPosition);
        return () => {
            window.removeEventListener('resize', calculateNotificationPosition);
        };
    }, []);


    if (error) {
        return <ErrorPage code={error.response?.status} msg1={error.response?.statusText} msg2={error.message} />
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div ref={parentRef}>
                {showNotification && (
                    <>
                        <Notification
                            type="info"
                            onClose={handleMultiDownload}
                            message={msg}
                            position={notificationPosition}
                        />
                        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setShowNotification(false)}></div>
                    </>
                )}
                <div className='flex flex-row justify-between mb-10'>
                    <div className='flex flex-row items-center gap-2 border-2 border-gray-300 px-2 rounded-sm justify-start w-1/4'>
                        <div className='h-full rounded-s-md flex justify-center py-[2px] items-center text-gray-500 text-xl'>
                            <IoSearchSharp />
                        </div>
                        <input
                            placeholder='Tìm kiếm'
                            className='outline-none text-sm placeholder:text-sm w-full'
                            value={date}
                            type='month'
                            onChange={handleChange}
                        />
                    </div>
                    <button className='border-gray-100 px-4 py-1 border-2 rounded-md text-sm  font-semibold text-gray-medium hover:bg-gray-200 transition-colors'
                        onClick={handleShowNotification}>
                        Tải tất cả
                    </button>
                </div>

                <div className='h-full' onClick={closeMenu}>
                    <div className='overflow-y-auto max-h-[500px]'>
                        <table className="table-auto w-full text-sm text-left border-2 border-gray-300">
                            <thead className="bg-[#EAEBEB] sticky top-0 z-1">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column.id}
                                            className="p-2 cursor-pointer border-2 items-center "
                                            style={{ width: column.width }}
                                        >
                                            <div className={column.id === 3 ? "flex flex-row items-center justify-center" : "flex flex-row items-center justify-between"}>
                                                <p className="inline">{column.value}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-gray-100 cursor-pointer h-14">
                                        <td className="border-r-2 p-2">{row.empName}</td>
                                        <td className="border-r-2 p-2">{formatDate(row.dateAwarded)}</td>
                                        <td className="p-2 flex flex-row justify-center items-center h-14">
                                            <button onClick={(event) => handleActionClick(event, row.id)}><FaEllipsisH /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        {/* Menu */}
                        {menuVisible && (
                            <div
                                className="absolute bg-white border shadow-md rounded-md w-[150px]"
                                style={{
                                    top: menuPosition.y,
                                    left: menuPosition.x,
                                    zIndex: 1000,
                                }}
                            >
                                <ul className="divide-y divide-gray-200">
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                        <FaEye className="mr-2" />
                                        Xem
                                    </li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                        <FaEdit className="mr-2" />
                                        Chỉnh sửa
                                    </li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                        onClick={handleDownload}
                                    >
                                        <FaDownload className="mr-2" />
                                        Tải về
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                    <div className="flex flex-row items-center justify-end py-14">
                        <button
                            className='bg-blue-medium px-6 py-1 rounded-md text-sm text-white hover:bg-blue-dark transition-colors'
                            onClick={null}>
                            Thêm mới
                        </button>
                    </div>

                </div>
            </div >
        </>
    )
}

export default ListView