import React, { useEffect, useState } from 'react'
import { FaDownload, FaEye } from 'react-icons/fa6';
import { formatDate } from '../../../utils/formatDate';
import { FaEdit, FaEllipsisH } from "react-icons/fa";
import { useAuthContext } from '../../../contexts/AuthProvider';

const ListView = () => {

    const [columns] = useState([
        { id: 1, name: "empName", value: "Tên nhân viên", width: "40%" },
        { id: 2, name: "lastUpdate", value: "Ngày Cập nhật cuối", width: "35%" },
        { id: 3, name: "action", value: "Action", width: "25%" },
    ]);

    const data = [
        { name: "Arlene McCoy", date: "August 2, 2023" },
        { name: "Cody Fisher", date: "September 24, 2018" },
        { name: "Esther Howard", date: "December 29, 2022" },
        { name: "Ronald Richards", date: "May 20, 2019" },
        { name: "Arlene McCoy", date: "August 2, 2023" },
        { name: "Cody Fisher", date: "September 24, 2018" },
        { name: "Esther Howard", date: "December 29, 2022" },
        { name: "Ronald Richards", date: "May 20, 2019" },
        { name: "Arlene McCoy", date: "August 2, 2023" },
        { name: "Cody Fisher", date: "September 24, 2018" },
        { name: "Esther Howard", date: "December 29, 2022" },
        { name: "Ronald Richards", date: "May 20, 2019" },
        { name: "Arlene McCoy", date: "August 2, 2023" },
        { name: "Cody Fisher", date: "September 24, 2018" },
        { name: "Esther Howard", date: "December 29, 2022" },
        { name: "Ronald Richards", date: "May 20, 2019" },
    ];

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const { getToken } = useAuthContext();

    const handleActionClick = (event) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        const menuWidth = 150;
        setMenuPosition({ x: clientX - menuWidth, y: clientY });
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };


    const handleDownload = () => {

    }

    const handleSearch = () => {

    }

    const handleMultiDownload = () => {

    }

    useEffect(() => {
        const token = getToken();
        if (!token) return;

    }, [getToken])

    return (
        <>
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
                            {data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-100 cursor-pointer h-14">
                                    <td className="border-r-2 p-2">{row.name}</td>
                                    <td className="border-r-2 p-2">{formatDate(row.date)}</td>
                                    <td className="p-2 flex flex-row justify-center items-center h-14">
                                        <button onClick={handleActionClick}><FaEllipsisH /></button>
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
                                <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <FaDownload className="mr-2" />
                                    Lưu
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
        </>
    )
}

export default ListView