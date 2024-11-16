import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useState } from 'react';
import { FaSort } from "react-icons/fa";

const Request = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const [columns, setColumns] = useState([
    {
      id: 1,
      name: "firstName",
      value: "Tên nhân viên",
      width: '20%',
    },
    {
      id: 2,
      name: "requestType",
      value: "Loại yêu cầu",
      width: '10%',
    },
    {
      id: 3,
      name: "submitDate",
      value: "Ngày gửi yêu cầu",
      width: '30%',
    },
    {
      id: 4,
      name: "status",
      value: "Tình trạng",
      width: '20%',
    },

  ])

  const [data, setData] = useState([
    { id: 1, firstName: "Sawyer", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 2, firstName: "Alberta", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 3, firstName: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 4, firstName: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 5, firstName: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 6, firstName: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
    { id: 7, firstName: "Victor", requestType: "Nghỉ phép", submitDate: "21/11/2024", status: "Chưa xét duyệt" },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const handleSubmit = () => {
    setShowDialog(true);
  }

  const handleConfirm = () => {
    setShowDialog(false);
  }

  return (
    <div className='bg-white rounded-lg w-full h-full py-6 px-6 font-inter 
    flex flex-col gap-4 overflow-y-auto'>
      {/* Header */}
      <h1 className='font-semibold text-2xl text-gray-medium '>
        XÉT DUYỆT YÊU CẦU
      </h1>
      {/* Divider */}
      <span className='w-full h-[1.4px] bg-gray-300'></span>
      <div className='flex flex-row justify-between'>
        {/* Search and History*/}
        <div className='flex flex-row gap-8'>
          <button className='border-gray-medium px-4 py-1 border-2 rounded-md text-sm 
          font-semibold text-gray-medium hover:bg-gray-200 transition-colors'>
            LỊCH SỬ
          </button>
          <div className='flex flex-row items-center gap-2 border-2 border-gray-300 py-1 px-2 rounded-sm'>
            <div className='h-full rounded-s-md flex justify-center items-center text-gray-500 text-xl'>
              <IoSearchSharp />
            </div>
            <input
              placeholder='Tìm kiếm'
              className='outline-none placeholder:text-sm w-[600px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Select */}
        <div className='flex flex-row gap-4'>
          <button className='border-gray-medium px-4 py-1 border-2 rounded-md text-sm 
          font-semibold text-gray-medium hover:bg-gray-200 transition-colors'>
            BỎ CHỌN
          </button>
          <button className='border-gray-medium px-4 py-1 rounded-md text-sm font-semibold
         text-white hover:bg-blue-700 transition-colors bg-blue-medium'>
            CHỌN TẤT CẢ
          </button>
        </div>
      </div>
      {/* Request List */}
      <table className="table-auto w-full border-collapse text-sm text-left border-2 border-gray-300">
        <thead className="bg-[#EAEBEB]">
          <tr>
            <th className="p-2 w-[3%] border-2 border-gray-300">
              <input type="checkbox" className="form-checkbox h-4 w-4" />
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
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 cursor-pointer">
              <td className="border-r-2 border-gray-300 px-2 py-4">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
              </td>
              <td className="border-r-2 border-gray-300 p-2">{row.firstName}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.requestType}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.submitDate}</td>
              <td className="border-r-2 border-gray-300 p-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Action */}
      <div className='flex flex-row justify-between'>
        <button className='border-gray-medium px-8 py-1 border-2 rounded-md text-sm 
          font-semibold text-gray-medium hover:bg-gray-200 transition-colors'>
          XÓA
        </button>
        <div className='flex flex-row gap-4'>
          <button className='bg-[#7A7CFF] px-6 py-1 rounded-md text-sm 
           text-white hover:bg-[#585af0] transition-colors'>
            TỪ CHỐI
          </button>
          <button 
          className='bg-blue-medium px-6 py-1 rounded-md text-sm 
           text-white hover:bg-blue-dark transition-colors'
           onClick={handleSubmit}>
            ĐỒNG Ý
          </button>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xét duyệt?</h3>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-1 rounded-md bg-gray-medium text-white hover:bg-gray-700"
                onClick={() => setShowDialog(false)}>
                Hủy
              </button>
              <button
                className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleConfirm}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default Request
