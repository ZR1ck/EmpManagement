import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { FaSort } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { approveRequest, downloadFile, getAllRequest, getRequest } from '../../api/request';
import { useAuthContext } from '../../contexts/AuthProvider';
import LoadingScreen from '../../components/Loading';
import ErrorPage from '../../components/Error';
import { formatDate } from '../../utils/formatDate';
import { FaDownload } from "react-icons/fa";


const Request = () => {

  const [columns] = useState([
    { id: 1, name: "empName", value: "Tên nhân viên", width: "20%" },
    { id: 2, name: "source", value: "Loại yêu cầu", width: "10%" },
    { id: 3, name: "createDate", value: "Ngày gửi yêu cầu", width: "30%" },
    { id: 4, name: "approvalStatus", value: "Tình trạng", width: "20%" },
  ]);

  const [data, setData] = useState([]);
  // {
  //   id: 1, name: "Sawyer", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt",
  //   department: "Marketing", startDate: "22/11/2024", endDate: "24/11/2024", reason: "Du lịch"
  // },

  const [detail, setDetail] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredData, setFilteredData] = useState(data.filter((item) => item.approvalStatus === "Peding"));
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [action, setAction] = useState('');
  const [refresh, setRefresh] = useState(false);


  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestTypeConvert = (requestType) => {
    switch (requestType) {
      case "LeaveRequest": return "Nghỉ phép"
      case "HalfDayLeaveRequest": return "Nghỉ nửa ngày"
      case "TimeAttendanceUpdateRequest": return "Cập nhật chấm công"
      case "WFHRequest": return "WFH"
      default: return "Khác"
    }
  }

  const statusConvert = (status) => {
    switch (status) {
      case "Pending": return "Chưa xét duyệt"
      case "Approved": return "Đã duyệt"
      case "Declined": return "Đã từ chối"
      default: return "Lỗi"
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (user.empid) {
          const response = await getAllRequest(user.empid, token);
          if (response) {
            const data = response.map((item, index) => ({
              ...item,
              id: index + 1
            }));
            console.log(data);
            setData(data);
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
    if (data.length > 0) {
      let filterData = [];
      if (isShowHistory) {
        filterData = data.filter((item) => item.approvalStatus !== "Pending")
      } else {
        filterData = data.filter((item) => item.approvalStatus === "Pending")
      }

      if (searchTerm) {
        setFilteredData(data.filter(item =>
          item.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          requestTypeConvert(item.source).toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.createDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.approvalStatus.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredData(filterData);
      }
    }
  }, [searchTerm, isShowHistory, data])

  const handleHistoryClick = () => {
    if (!isShowHistory) {
      setIsShowHistory(true);
      setFilteredData(data.filter((item) => item.approvalStatus !== "Pending"));
    } else {
      setIsShowHistory(false);
      setFilteredData(data.filter((item) => item.approvalStatus === "Pending"));
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

  const handleRowClick = async (request) => {
    try {
      const token = localStorage.getItem('token');
      const response = await getRequest(request.requestId, request.source, token)
      if (response) {
        const data = { ...request, ...response }
        console.log('clicked: ', data);
        setCurrentRequest(data);
        setCheckedItems((prev) =>
          prev.includes(request.id) ? prev : [...prev, request.id]
        );
        setShowRequestDetail(true);
      }
    }
    catch (e) {
      console.log("Fetching request detail error: ", e);
    }
  };

  const handleDownload = async (urls) => {
    console.log('downloading...')
    const token = localStorage.getItem('token');
    await downloadFile(urls, token);
  }

  const handleSort = (key) => {
    console.log(key);
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

  const handleConfirm = async () => {
    if (checkedItems.length === 0) {
      toast.error("Không có yêu cầu nào được chọn");
      return;
    }
    console.log("Selected IDs:", checkedItems);
    console.log("action: ", action);

    try {
      const token = localStorage.getItem('token');
      const choosenObjs = data.filter(item => checkedItems.includes(item.id));
      if (action === 'approve') {
        await approveRequest(choosenObjs, "Approved", token)
        setRefresh(!refresh);
      }
      else if (action === 'decline') {
        await approveRequest(choosenObjs, "Declined", token)
        setRefresh(!refresh);
      }
    }
    catch (e) {
      console.log("Approving error")
    }

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
                    <td className="border-r-2 border-gray-300 p-2">{row.empName}</td>
                    <td className="border-r-2 border-gray-300 p-2">{requestTypeConvert(row.source)}</td>
                    <td className="border-r-2 border-gray-300 p-2">{row.createDate}</td>
                    <td className="border-r-2 border-gray-300 p-2">{statusConvert(row.approvalStatus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-2">
              <div className='bg-white px-8 py-8 rounded-lg flex flex-col gap-2'>
                <h1 className='font-bold text-center text-lg mb-4'>
                  YÊU CẦU CHI TIẾT
                </h1>
                <p><strong>Họ tên:</strong> {currentRequest.empName}</p>
                {/* <p><strong>Phòng ban:</strong> {currentRequest.department}</p> */}
                <p><strong>Loại yêu cầu:</strong> {requestTypeConvert(currentRequest.source)}</p>
                <p><strong>Ngày gửi yêu cầu:</strong> {formatDate(currentRequest.createDate)}</p>

                {(currentRequest.source === 'LeaveRequest' || currentRequest.source === 'WFHRequest') &&
                  <p><strong>Ngày hiệu lực:</strong> {formatDate(currentRequest.startdate)} - {formatDate(currentRequest.enddate)}</p>
                }

                {(currentRequest.source === 'HalfDayLeaveRequest') && (<>
                  <p><strong>Ngày hiệu lực:</strong> {formatDate(currentRequest.startdate)}</p>
                  <p><strong>Từ: </strong>{currentRequest.starthour}<strong> Đến: </strong>{currentRequest.endhour}</p>
                </>)}

                {currentRequest.source === 'TimeAttendanceUpdateRequest' && (<>
                  <p><strong>Record:</strong></p>
                  <p className='ms-6'><strong>Ngày:</strong> {formatDate(currentRequest.record.attendancedate)}</p>
                  <p className='ms-6'><strong>Checkin - Checkout:</strong> {currentRequest.record.checkintime} - {currentRequest.record.checkouttime}</p>
                </>)}

                <p className='font-bold'>Lý do</p>

                <textarea disabled className='border-[2px] px-2 py-1 border-black rounded-md h-32 w-[500px]' value={currentRequest.reason}></textarea>

                <div className='flex flex-row justify-start gap-5 items-center'>
                  <p><strong>Files: </strong>{currentRequest.attachmentUrl.length || 0}</p>
                  {currentRequest.attachmentUrl.length > 0 &&
                    <FaDownload className='hover:cursor-pointer' onClick={() => handleDownload(currentRequest.attachmentUrl)} />
                  }
                </div>



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
        </div>)}
    </div>

  )
}

export default Request
