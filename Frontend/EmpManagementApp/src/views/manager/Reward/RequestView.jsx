import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { BsLightningChargeFill } from "react-icons/bs";
import ErrorPage from '../../../components/Error';
import LoadingScreen from '../../../components/Loading';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { formatDate } from '../../../utils/formatDate';


const RequestView = () => {

    const [columns] = useState([
        { id: 1, name: "empName", value: "Tên nhân viên", width: "20%" },
        { id: 2, name: "createDate", value: "Ngày gửi yêu cầu", width: "20%" },
        { id: 3, name: "requestInfo", value: "Thông tin yêu cầu", width: "30%" },
        { id: 4, name: "approvalStatus", value: "Tình trạng", width: "20%" },
    ]);

    // Sample data
    const data = [
        { id: 1, empName: "Nhân viên A", createDate: "2023-07-12", requestInfo: "", approvalStatus: "Pending" },
        { id: 2, empName: "Nhân viên B", createDate: "2024-05-23", requestInfo: "", approvalStatus: "Pending" },
        { id: 3, empName: "Nhân viên C", createDate: "2022-11-08", requestInfo: "", approvalStatus: "Approved" },
        { id: 4, empName: "Nhân viên D", createDate: "2023-01-15", requestInfo: "", approvalStatus: "Declined" },
        { id: 5, empName: "Nhân viên E", createDate: "2024-09-29", requestInfo: "", approvalStatus: "Approved" },
    ];


    //const [data, setData] = useState([]);
    // { id: 1, activityName: "Thử thách bơi lội 1km", employeeName: "Nhân viên A", dept: "IT", submitDate: "2024-10-19", status: "Đồng ý" }


    const [searchTerm, setSearchTerm] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [filteredData, setFilteredData] = useState(data.filter((item) => item.approvalStatus === "Pending"));
    const [isShowHistory, setIsShowHistory] = useState(false);
    const [action, setAction] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState("");


    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const { user, getToken } = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const statusConvert = (status) => {
        switch (status) {
            case "Pending": return "Chưa xét duyệt"
            case "Approved": return "Đã duyệt"
            case "Declined": return "Đã từ chối"
            default: return "Lỗi"
        }
    }

    /*useEffect(() => {
      const fetchData = async () => {
        try {
          const token = getToken();
          if (!token) return;
          if (user.empid) {
            const response = await getAllApprovalRequest(user.empid, token);
            if (response) {
              setData(response);
              console.log(response);
              setLoading(false);
              setError(null);
            }
          }
        }
        catch (e) {
          console.log("Request fetching error", e);
          setError(e);
        }
      }
  
      fetchData();
  
  
    }, [user, refresh]);*/

    useEffect(() => {
        let filterData = [];
        if (isShowHistory) {
            filterData = data.filter((item) => item.approvalStatus !== "Pending")
        } else {
            filterData = data.filter((item) => item.approvalStatus === "Pending")
        }

        if (searchTerm) {
            setFilteredData(data.filter(item =>
                item.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                formatDate(item.createDate).toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.requestInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                statusConvert(item.approvalStatus).toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredData(filterData);
        }
    }, [searchTerm, isShowHistory]);

    const handleHistoryClick = () => {
        if (!isShowHistory) {
            setIsShowHistory(true);
            setFilteredData(data.filter((item) => item.status !== "Pending"));
        } else {
            setIsShowHistory(false);
            setFilteredData(data.filter((item) => item.status === "Pending"));
        }
    };

    const handleSelectAll = () => {
        const allIds = filteredData.map((item) => item.id);
        setCheckedItems(allIds);
        setSelectAll(true);
    };

    const handleDeselectAll = () => {
        setCheckedItems([]);
        setSelectAll(false);
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setSortConfig({ key, direction });
        setFilteredData(sortedData);
    };

    const handleApprove = () => {
        setAction('approve');
        setShowDialog(true);
    }

    const handleDecline = () => {
        setAction('decline');
        setShowDialog(true);
    }

    // Popup xem thông tin yêu cầu
    const handleOpenPopup = (info) => {
        setPopupContent(info);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupContent("");
        setPopupVisible(false);
    };

    const handleConfirm = async () => {
        if (checkedItems.length === 0) {
            toast.error("Không có yêu cầu nào được chọn");
            return;
        }
        console.log("Selected IDs:", checkedItems);
        console.log("action: ", action);

        /*try {
      const token = localStorage.getItem('token');
      if (action === 'approve') {
        await updateApprovalRequestStatus(checkedItems, "Approved", token)
        setRefresh(!refresh);
      }
      else if (action === 'decline') {
        await updateApprovalRequestStatus(checkedItems, "Declined", token)
        setRefresh(!refresh);
      }
    }
    catch (e) {
      console.log("Approving error: ", e)
    }*/

        /////////////////////////////////
        setCheckedItems([]);
        // console.log("Selected IDs after clear:", checkedItems);
        setShowDialog(false);
        if (checkedItems.length !== 0) {
            toast.success("Duyệt thành công");
        }
    }

    return (
        <>
            <div className='flex'>
                <button className={`border-gray-medium px-4 py-1 border-2 rounded-md text-sm font-semibold text-gray-medium hover:bg-gray-200 transition-colors ${isShowHistory ? 'bg-gray-300 underline' : ''}`}
                    onClick={handleHistoryClick}>
                    LỊCH SỬ
                </button>
            </div>

            <div className='overflow-y-auto max-h-[500px]'>
                <table className="table-auto w-full border-collapse text-sm text-left border-2 border-gray-300">
                    <thead className="bg-[#EAEBEB] sticky top-0 z-1">
                        <tr>
                            <th className="p-2 w-[3%] border-2 border-gray-300">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4"
                                    checked={selectAll}
                                    onChange={() => (selectAll ? handleDeselectAll() : handleSelectAll())} />
                            </th>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="p-2 cursor-pointer border-2 border-gray-300"
                                    onClick={() => handleSort(column.name)}
                                    style={{ width: column.width }}
                                >
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="inline">{column.value}</p>
                                        {column.id !== 3 ? (<FaSort className="inline ml-1" />) : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-100 cursor-pointer">
                                <td className="border-r-2 border-gray-300 px-2 py-4">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4"
                                        checked={checkedItems.includes(row.id)}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={() => handleCheckboxChange(row.id)}
                                    />
                                </td>
                                <td className="border-r-2 border-gray-300 p-2">{row.empName}</td>
                                <td className="border-r-2 border-gray-300 p-2">{formatDate(row.createDate)}</td>
                                <td className="border-r-2 border-gray-300 p-2">{row.requestInfo}
                                    <button
                                        onClick={() => handleOpenPopup(data[row.id - 1].requestInfo)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Xem nội dung
                                    </button>
                                </td>
                                <td className="border-r-2 border-gray-300 p-2">{statusConvert(row.approvalStatus)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-row justify-between'>
                <button
                    className={`border-gray-medium px-8 py-1 border-2 rounded-md text-sm 
          font-semibold text-gray-medium hover:bg-gray-200 transition-colors
          ${isShowHistory ? '' : 'hidden'}`}
                    onClick={handleHistoryClick}>
                    ĐƠN CHƯA DUYỆT
                </button>
                <div></div>
                <div className='flex flex-row gap-4'>
                    <button className='bg-[#7A7CFF] px-6 py-1 rounded-md text-sm 
           text-white hover:bg-[#585af0] transition-colors'
                        onClick={handleDecline}>
                        TỪ CHỐI
                    </button>
                    <button
                        className='bg-blue-medium px-6 py-1 rounded-md text-sm 
           text-white hover:bg-blue-dark transition-colors'
                        onClick={handleApprove}>
                        ĐỒNG Ý
                    </button>
                </div>
            </div>
            {showDialog && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className='flex flex-col bg-white px-8 py-6 rounded-lg gap-6'>
                        <div className=' flex flex-row items-center gap-4'>
                            <span className='bg-gray-200 py-4 px-4 rounded-md text-[1.5rem]'>
                                <IoCheckmarkCircleOutline />
                            </span>
                            <div className='flex flex-col justify-between'>
                                <p className='text-[18px] font-semibold'>Xác nhận xét duyệt</p>
                                <p className='text-[12px] text-gray-medium'>Xét duyệt {checkedItems.length} dòng</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <button
                                className='border-2 px-16 rounded-md border-gray-medium py-2 text-sm
               hover:bg-gray-300 transition-colors'
                                onClick={() => setShowDialog(false)}>
                                Hủy
                            </button>
                            <button className='px-16 rounded-md bg-blue-medium text-white py-2 
              text-sm hover:bg-blue-dark transition-colors'
                                onClick={handleConfirm}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/** Popup */}
            {popupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                        <h2 className="text-lg font-semibold mb-4">Thông tin yêu cầu</h2>
                        <div className="min-h-[100px]">{popupContent || "Không có thông tin hiển thị"}</div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleClosePopup}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default RequestView