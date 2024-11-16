import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';


const Request = () => {

  const [columns, setColumns] = useState([
    { id: 1, name: "name", value: "Tên nhân viên", width: "20%" },
    { id: 2, name: "requestType", value: "Loại yêu cầu", width: "10%" },
    { id: 3, name: "submitDate", value: "Ngày gửi yêu cầu", width: "30%" },
    { id: 4, name: "status", value: "Tình trạng", width: "20%" },
  ]);

  const [data, setData] = useState([
    {
      id: 1, name: "Sawyer", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt",
      department: "Marketing", startDate: "22/11/2024", endDate: "24/11/2024", reason: "Du lịch"
    },
    {
      id: 2, name: "Alberta", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt",
      department: "HR", startDate: "23/11/2024", endDate: "25/11/2024", reason: "Kết hôn"
    },
    {
      id: 3, name: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt",
      department: "Sales", startDate: "25/11/2024", endDate: "27/11/2024", reason: "Thăm gia đình"
    },
    {
      id: 4, name: "John", requestType: "Nghỉ phép", submitDate: "22/11/2024", status: "Chưa xét duyệt",
      department: "Finance", startDate: "28/11/2024", endDate: "30/11/2024", reason: "Du lịch"
    },
    {
      id: 5, name: "Sophia", requestType: "Nghỉ phép", submitDate: "22/11/2024", status: "Chưa xét duyệt",
      department: "IT", startDate: "01/12/2024", endDate: "03/12/2024", reason: "Nghỉ ốm"
    },
    {
      id: 6, name: "Tom", requestType: "Nghỉ phép", submitDate: "23/11/2024", status: "Chưa xét duyệt",
      department: "Marketing", startDate: "05/12/2024", endDate: "07/12/2024", reason: "Du lịch"
    },
    {
      id: 7, name: "Lily", requestType: "Nghỉ phép", submitDate: "24/11/2024", status: "Chưa xét duyệt",
      department: "Sales", startDate: "10/12/2024", endDate: "12/12/2024", reason: "Thăm gia đình"
    },
    {
      id: 8, name: "David", requestType: "Nghỉ phép", submitDate: "25/11/2024", status: "Chưa xét duyệt",
      department: "HR", startDate: "15/12/2024", endDate: "17/12/2024", reason: "Kết hôn"
    },
    {
      id: 9, name: "Eva", requestType: "Nghỉ phép", submitDate: "26/11/2024", status: "Chưa xét duyệt",
      department: "Finance", startDate: "20/12/2024", endDate: "22/12/2024", reason: "Du lịch"
    },
    {
      id: 10, name: "James", requestType: "Nghỉ phép", submitDate: "27/11/2024", status: "Chưa xét duyệt",
      department: "Marketing", startDate: "01/01/2025", endDate: "03/01/2025", reason: "Kết hôn"
    },
    {
      id: 11, name: "Sophie", requestType: "Nghỉ phép", submitDate: "02/12/2024", status: "Đồng ý",
      department: "Marketing", startDate: "10/01/2025", endDate: "12/01/2025", reason: "Du lịch"
    },
    {
      id: 12, name: "Daniel", requestType: "Nghỉ phép", submitDate: "03/12/2024", status: "Từ chối",
      department: "HR", startDate: "15/01/2025", endDate: "17/01/2025", reason: "Nghỉ ốm"
    },
    {
      id: 13, name: "Lucas", requestType: "Nghỉ phép", submitDate: "04/12/2024", status: "Đồng ý",
      department: "Sales", startDate: "20/01/2025", endDate: "22/01/2025", reason: "Thăm gia đình"
    },
    {
      id: 14, name: "Grace", requestType: "Nghỉ phép", submitDate: "05/12/2024", status: "Từ chối",
      department: "Finance", startDate: "01/02/2025", endDate: "03/02/2025", reason: "Du lịch"
    },
    {
      id: 15, name: "Jack", requestType: "Nghỉ phép", submitDate: "06/12/2024", status: "Đồng ý",
      department: "IT", startDate: "10/02/2025", endDate: "12/02/2025", reason: "Kết hôn"
    },
    {
      id: 16, name: "Mia", requestType: "Nghỉ phép", submitDate: "07/12/2024", status: "Từ chối",
      department: "Marketing", startDate: "15/02/2025", endDate: "17/02/2025", reason: "Nghỉ ốm"
    },
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
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.submitDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredData(filterData);
    }
  }, [searchTerm, data]);

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
    <div className='bg-white rounded-lg w-full h-full py-6 px-6 font-inter 
    flex flex-col gap-6 overflow-y-auto'>
      {/* Header */}
      <h1 className='font-semibold text-2xl text-gray-medium '>
        XÉT DUYỆT YÊU CẦU
      </h1>
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
              <td className="border-r-2 border-gray-300 p-2">{row.name}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.requestType}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.submitDate}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Action */}
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

export default Request
