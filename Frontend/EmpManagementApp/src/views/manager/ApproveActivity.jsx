import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const ApproveActivity = () => {

  const [columns] = useState([
        { id: 1, name: "activityName", value: "Tên hoạt động", width: "20%" },
        { id: 2, name: "employeeName", value: "Tên nhân viên", width: "20%" },
        { id: 3, name: "submitDate", value: "Ngày gửi yêu cầu", width: "20%" },
        { id: 4, name: "status", value: "Tình trạng", width: "15%" },
    ]);

    const [data] = useState([
        { id: 1, activityName: "Thử thách bơi lội 1km", employeeName: "Nhân viên A", submitDate: "2024-10-19", status: "Đồng ý" },
        { id: 2, activityName: "Thử thách chạy marathon", employeeName: "Nhân viên B", submitDate: "2024-11-22", status: "Từ chối" },
        { id: 3, activityName: "Thử thách đạp xe 100km", employeeName: "Nhân viên C", submitDate: "2024-12-15", status: "Chưa xét duyệt" },
        { id: 4, activityName: "Thử thách leo núi 2km", employeeName: "Nhân viên D", submitDate: "2024-10-30", status: "Đồng ý" },
        { id: 5, activityName: "Thử thách bóng đá", employeeName: "Nhân viên E", submitDate: "2024-11-05", status: "Từ chối" },
        { id: 6, activityName: "Thử thách yoga 1 tuần", employeeName: "Nhân viên F", submitDate: "2024-11-28", status: "Chưa xét duyệt" },
        { id: 7, activityName: "Thử thách thiền 3 ngày", employeeName: "Nhân viên G", submitDate: "2024-12-01", status: "Đồng ý" },
        { id: 8, activityName: "Thử thách bóng rổ 10 trận", employeeName: "Nhân viên H", submitDate: "2024-11-15", status: "Từ chối" },
        { id: 9, activityName: "Thử thách đi bộ 5km", employeeName: "Nhân viên I", submitDate: "2024-12-10", status: "Chưa xét duyệt" },
        { id: 10, activityName: "Thử thách cắm trại", employeeName: "Nhân viên J", submitDate: "2024-12-20", status: "Đồng ý" },
    ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredData, setFilteredData] = useState(data.filter((item) => item.status === "Chưa xét duyệt"));
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [action, setAction] = useState('');


  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });


  useEffect(() => {
    let filterData = [];
    if (isShowHistory) {
      filterData = data.filter((item) => item.status !== "Chưa xét duyệt")
    } else {
      filterData = data.filter((item) => item.status === "Chưa xét duyệt")
    }

    if (searchTerm) {
      setFilteredData(data.filter(item =>
        item.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.submitDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredData(filterData);
    }
  }, [searchTerm, data, isShowHistory]);

  const handleHistoryClick = () => {
    if (!isShowHistory) {
      setIsShowHistory(true);
      setFilteredData(data.filter((item) => item.status !== "Chưa xét duyệt"));
    } else {
      setIsShowHistory(false);
      setFilteredData(data.filter((item) => item.status === "Chưa xét duyệt"));
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

  const handleRowClick = (request) => {
    setCurrentRequest(request);
    setCheckedItems((prev) =>
      prev.includes(currentRequest.id) ? prev : [...prev, currentRequest.id]
    );
    setShowRequestDetail(true);
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

  const handleCancel = () => {
    setShowRequestDetail(false);
    setCurrentRequest({});
  }

  const handleApprove = () => {
    setShowRequestDetail(false);
    setAction('approve');
    if (currentRequest) {
      setCurrentRequest({});
    }
    setShowDialog(true);
  }

  const handleDecline = () => {
    setShowRequestDetail(false);
    setAction('decline');
    if (currentRequest) {
      setCurrentRequest({});
    }
    setShowDialog(true);
  }

  const handleConfirm = () => {
    if (checkedItems.length === 0) {
      toast.error("Không có yêu cầu nào được chọn");
      return;
    }
    console.log("Selected IDs:", checkedItems);
    console.log("action: ", action);
    /////////////////////////////////
    setShowRequestDetail(false);
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
      <table className="table-auto w-full border-collapse text-sm text-left border-2 border-gray-300">
        <thead className="bg-[#EAEBEB]">
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
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(row)}>
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
              <td className="border-r-2 border-gray-300 p-2">{row.employeeName}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.submitDate}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
            onClick={handleDecline}
            disabled={isShowHistory}>
            TỪ CHỐI
          </button>
          <button
            className='bg-blue-medium px-6 py-1 rounded-md text-sm 
           text-white hover:bg-blue-dark transition-colors'
            onClick={handleApprove}
            disabled={isShowHistory}>
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
      {showRequestDetail && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className='bg-white px-8 py-8 rounded-lg flex flex-col gap-2'>
            <h1 className='font-bold text-center text-lg mb-4'>
              YÊU CẦU CHI TIẾT
            </h1>
            <p><strong>Họ tên:</strong> {currentRequest.name}</p>
            <p><strong>Phòng ban:</strong> {currentRequest.department}</p>
            <p><strong>Loại yêu cầu:</strong> {currentRequest.requestType}</p>
            <p><strong>Ngày gửi yêu cầu:</strong> {currentRequest.submitDate}</p>
            <p><strong>Ngày hiệu lực:</strong> {currentRequest.startDate} - {currentRequest.endDate}</p>
            <p className='font-bold'>Lý do</p>
            <textarea disabled className='border-[2px] px-2 py-1 border-black rounded-md h-32 w-[500px]'>
              {currentRequest.reason}
            </textarea>
            <div className='flex flex-row justify-between mt-2'>
              <button
                className='border-gray-medium px-6 py-1 border-2 rounded-md text-sm 
              font-semibold text-gray-medium hover:bg-gray-200 transition-colors'
                onClick={handleCancel}>
                QUAY LẠI
              </button>
              <div className='flex flex-row gap-4'>
                <button
                  className='px-4 py-1 rounded-md text-sm bg-[#7A7CFF]
                text-white hover:bg-[#4b4dc9] transition-colors'
                  onClick={handleDecline}>
                  TỪ CHỐI
                </button>
                <button className='px-4 py-1 rounded-md text-sm bg-blue-medium
                text-white hover:bg-blue-dark transition-colors'
                  onClick={handleApprove}>
                  ĐỒNG Ý
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default ApproveActivity
