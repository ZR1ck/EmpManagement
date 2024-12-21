import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { getAllApprovalRequest, updateApprovalRequestStatus } from '../../api/activity';
import ErrorPage from '../../components/Error';
import LoadingScreen from '../../components/Loading';
import { useAuthContext } from '../../contexts/AuthProvider';
import { formatDate } from '../../utils/formatDate';


const ApproveActivity = () => {

  const [columns] = useState([
    { id: 1, name: "activityName", value: "Tên hoạt động", width: "20%" },
    { id: 2, name: "empName", value: "Tên nhân viên", width: "20%" },
    { id: 3, name: "empDeptName", value: "Phòng ban", width: "20%" },
    { id: 4, name: "createDate", value: "Ngày gửi yêu cầu", width: "20%" },
    { id: 5, name: "approvalStatus", value: "Tình trạng", width: "15%" },
  ]);

  const [data, setData] = useState([]);
  // { id: 1, activityName: "Thử thách bơi lội 1km", employeeName: "Nhân viên A", dept: "IT", submitDate: "2024-10-19", status: "Đồng ý" }


  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredData, setFilteredData] = useState(data.filter((item) => item.approvalStatus === "Pending"));
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [action, setAction] = useState('');


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

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const fetchData = async () => {
      try {
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


  }, [user, refresh]);

  useEffect(() => {
    let filterData = [];
    if (isShowHistory) {
      filterData = data.filter((item) => item.approvalStatus !== "Pending")
    } else {
      filterData = data.filter((item) => item.approvalStatus === "Pending")
    }

    if (searchTerm) {
      setFilteredData(data.filter(item =>
        item.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(item.createDate).toLowerCase().includes(searchTerm.toLowerCase()) ||
        statusConvert(item.approvalStatus).toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredData(filterData);
    }
  }, [searchTerm, data, isShowHistory]);

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

  const handleConfirm = async () => {
    if (checkedItems.length === 0) {
      toast.error("Không có yêu cầu nào được chọn");
      return;
    }
    console.log("Selected IDs:", checkedItems);
    console.log("action: ", action);


    try {
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
    }

    /////////////////////////////////
    setCheckedItems([]);
    // console.log("Selected IDs after clear:", checkedItems);
    setShowDialog(false);
    if (checkedItems.length !== 0) {
      toast.success("Duyệt thành công");
    }
  }

  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter 
    flex flex-col gap-4 overflow-y-auto'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl'>
            Quản lý hoạt động <span><BsLightningChargeFill className='text-yellow-500 inline' /></span>
          </h1>
          <span className='font- text-sm text-gray-medium'>
            Cập nhật lần cuối: 30/10/2024
          </span>
        </div>
        {/* Activity List */}
        <Link to='/manager/activity' className='flex flex-row items-center gap-2 text-gray-medium 
                font-semibold hover:underline text-sm'>
          <p>Danh sách hoạt động</p>
          <FaArrowRight />
        </Link>
      </div>
      {/* Divider */}
      <div className='flex'>
        <span className='w-full h-[1.4px] bg-gray-300'></span>
      </div>

      {error ? (
        <ErrorPage />
      ) : loading ? (
        <LoadingScreen />
      ) : (

        <div className='w-full h-full py-6 px-6 font-inter flex flex-col gap-6 overflow-y-auto'>
          {/* History, Search And Select */}
          <div className='flex flex-row justify-between'>
            {/* Search and History*/}
            <div className='flex flex-row gap-8'>
              <button
                className={`border-gray-medium px-4 py-1 border-2 rounded-md text-sm 
            font-semibold text-gray-medium hover:bg-gray-200 transition-colors
            ${isShowHistory ? 'bg-gray-300 underline' : ''}`}

                onClick={handleHistoryClick}>
                LỊCH SỬ
              </button>
              <div className='flex flex-row items-center gap-2 border-2 border-gray-300 py-1 px-2 rounded-sm'>
                <div className='h-full rounded-s-md flex justify-center py-[2px] items-center text-gray-500 text-xl'>
                  <IoSearchSharp />
                </div>
                <input
                  placeholder='Tìm kiếm'
                  className='outline-none text-sm placeholder:text-sm w-[600px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* Select */}
            <div className='flex flex-row gap-4'>
              <button
                className='border-gray-medium px-4 py-1 border-2 rounded-md text-sm 
            font-semibold text-gray-medium hover:bg-gray-200 transition-colors'
                disabled={isShowHistory}
                onClick={handleDeselectAll}>
                BỎ CHỌN
              </button>
              <button
                className='border-gray-medium px-4 py-1 rounded-md text-sm font-semibold
          text-white hover:bg-blue-700 transition-colors bg-blue-medium'
                disabled={isShowHistory}
                onClick={handleSelectAll}>
                CHỌN TẤT CẢ
              </button>
            </div>
          </div>
          {/* Request List */}
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
                        <FaSort className="inline ml-1" />
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
                    <td className="border-r-2 border-gray-300 p-2">{row.activityName}</td>
                    <td className="border-r-2 border-gray-300 p-2">{row.empName}</td>
                    <td className="border-r-2 border-gray-300 p-2">{row.empDeptName}</td>
                    <td className="border-r-2 border-gray-300 p-2">{formatDate(row.createDate)}</td>
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
        </div>)}
    </div>

  )
}

export default ApproveActivity
