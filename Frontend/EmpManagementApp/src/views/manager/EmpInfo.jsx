import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaSistrix } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthProvider';
import ErrorPage from '../../components/Error';
import LoadingScreen from '../../components/Loading';

const EmpInfo = () => {

    const [users, setUsers] = useState([]);

    const { user, loading, error } = useAuthContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(2);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = users.slice(firstItemIndex, lastItemIndex);
    const [sortCol, setSortCol] = useState({ col: 'id', asc: true });
    const navigate = useNavigate();

    const totalPages = Math.ceil(users.length / itemsPerPage);
    // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const paginate = (page) => {
        if (page <= 0 || page > totalPages) {
            return;
        }
        else
            setCurrentPage(page);
    }

    const updateItemsPerPage = () => {
        const screenHeight = window.innerHeight;
        if (screenHeight < 600) {
            setItemPerPage(2);
        } else if (screenHeight >= 600 && screenHeight < 900) {
            setItemPerPage(4);
        } else {
            setItemPerPage(6);
        }
        setCurrentPage(1);
    };

    // Use useEffect to set up an event listener
    useEffect(() => {
        updateItemsPerPage(); // Initial check
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const sortHandler = (column) => {
        if (sortCol.col !== column) setSortCol({ col: column, asc: true });
        else setSortCol({ col: sortCol.col, asc: !sortCol.asc });

        setUsers(users.sort((a, b) => {
            if (a[column] < b[column]) return sortCol.asc ? -1 : 1;
            if (a[column] > b[column]) return sortCol.asc ? 1 : -1;
            return 0;
        }));
    }

    const empClickHandler = (empId) => {
        navigate(`/manager/employees/detail`, { state: { id: empId } });
    }

    // Fetch data
    useEffect(() => {
        const fetchData = async (deptno) => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/employees/dept/${deptno}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                setUsers(response.data.filter(emp => emp.id !== user.empid));
            }
        }

        if (user) {
            fetchData(user.dept.deptno);
        }

    }, [user])

    if (error) return <ErrorPage />
    if (loading) return <LoadingScreen />

    return (
        <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
            <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Quản lí nhân viên</h1>
            {/* Divider */}
            <span className='w-full h-[2px] bg-gray-200'></span>

            <div className='w-full flex flex-col items-end'>
                <search>
                    <form className='border border-gray-300 rounded px-3 py-2 flex flex-row items-center' >
                        <FaSistrix color='gray' />
                        <input name="fsrch" id="fsrch" placeholder="Tìm kiếm" type="text" className="ms-4 focus:outline-none focus:border-none focus:ring-0" />
                    </form>
                </search>
            </div>

            <div className='overflow-auto w-full h-3/5'>
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-5 text-left">#</th>
                            <th className="px-4 py-5 text-left hover:cursor-pointer" onClick={() => sortHandler('name')}>Họ Tên</th>
                            <th className="px-4 py-5 text-left hover:cursor-pointer" onClick={() => sortHandler('position')}>Vị trí</th>
                            <th className="px-4 py-5 text-left hover:cursor-pointer" onClick={() => sortHandler('email')}>Liên lạc</th>
                            <th className="px-4 py-5 text-left hover:cursor-pointer" onClick={() => sortHandler('status')}>Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => empClickHandler(user.id)}>
                                <td className="px-4 py-5">{index + 1 + firstItemIndex}</td>
                                <td className="px-4 py-5">{user.name}</td>
                                <td className="px-4 py-5">{user.position}</td>
                                <td className="px-4 py-5">{user.email}</td>
                                <td className="px-4 py-5">
                                    <span className={`text-${user.isAcitve ? 'green' : 'red'}-500`}>
                                    {user.lastActive}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='flex flex-col items-end'>
                <div className="mt-4 flex flex-row items-center">
                    <span className='text-[0.8rem] text-gray-500 me-5'>{firstItemIndex + 1} - {lastItemIndex > users.length ? users.length : lastItemIndex} of {users.length}</span>
                    <button className='mx-3' key={1} onClick={() => {
                        paginate(currentPage - 1);
                    }}>
                        <FaAngleLeft color='gray' />
                    </button>
                    <button className='mx-3' key={2} onClick={() => {
                        paginate(currentPage + 1)
                    }}>
                        <FaAngleRight color='gray' />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default EmpInfo