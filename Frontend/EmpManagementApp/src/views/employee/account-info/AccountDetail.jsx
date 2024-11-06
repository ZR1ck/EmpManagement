import React, { useState, useEffect } from 'react'
import avatar from './../../../assets/avatar.jpg'
import { BiQrScan } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Sidebar from './Sidebar';
import qr_code from './../../../assets/qrcode.jpg'

const InputField = ({ label, value, type }) => {
  return (
    <div className='flex flex-col  w-fit'>
      <label className='font-medium text-gray-400'>{label}</label>
      <input type={type} value={value} className='w-fit py-[4px] text-gray-medium'/>
    </div>
  )
}

const QRCode = ({showQRCode, setShowQRCode}) => {
  const handleShowQRCode = () => {
    setShowQRCode(!showQRCode);
  }

  return (
    <div className={`${showQRCode ? '' : 'hidden'} fixed font-inter top-0 left-0 
    w-screen h-screen flex justify-center items-center`} 
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
    onClick={handleShowQRCode}>
      <div className='bg-white  absolute flex justify-center items-center flex-col px-4 py-8 rounded-lg'>
        <img src={qr_code} alt='img-qr-code' className='w-56'/>
        <span className='font-bold text-gray-medium'>Quét mã để xem chi tiết</span>
      </div>
    </div>
  )
}

const AccountDetail = (userRole) => {

  const [showQRCode, setShowQRCode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Nguyễn Văn",
    lastName: "A",
    gender: "Nam",
    birthday: "2000-12-04",
    nationality: "Việt Nam",
    role: "Developer",
  })

  const [userAddress, setUserAddress] = useState({
    city: "Bình Dương",
    district: "Thành phố Dĩ An",
    ward: "Phường Đông Hòa",
    streetName: "Số x, đường y, Tòa z"  
  })

  const handleShowQRCode = () => {
    console.log(showQRCode);
    setShowQRCode(!showQRCode)
  }

  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter
    flex flex-col gap-4'>
      {/* Header */}
      <h1 className='mt-2 font-semibold text-[1.6rem] text-gray-dark'>Tài khoản</h1>
      {/* Divider */}
      <span className='w-full h-[2px] bg-gray-200'></span>
      {/* Info */}
      <div className='mt-2 gap-4 flex flex-row'>
        {/* Sidebar */}
        <Sidebar pathname='account-detail' role={userRole.role}/>
        {/* Content */}
        <div className='flex flex-col overflow-y-auto max-h-[550px] w-full gap-4 '>
          {/* Intro */}
          <div className='flex flex-row border-[2px] border-gray-light w-full pl-10 pr-4 py-4 
          rounded-lg justify-between'>
            <div className='flex flex-row gap-6 items-center'>
              <img src={avatar} alt='img-avatar' className='w-20 h-20 rounded-full' />
              <div className='flex flex-col gap-2'>
                <span className='font-semibold text-[1.5rem] text-gray-medium'>
                  Nguyen Van A
                </span>
                <span className='text-[1.2rem] text-gray-medium font-light'>
                  Developer
                </span>
              </div>
            </div>
            <BiQrScan className='text-[2rem] text-gray-dark cursor-pointer' onClick={handleShowQRCode}/>
          </div>
          {/* Personal Info */}
          <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
            <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
              <h3>Thông tin cá nhân</h3>
              <FiEdit className='text-[1.5rem]'/>
            </div>
            {/* Input Field */}
            <div className='mt-2 grid grid-cols-2 gap-4'>
              <InputField label="Họ" value={userInfo.firstName} type="text" />
              <InputField label="Tên" value={userInfo.lastName} type="text" />
              <InputField label="Giới tính" value={userInfo.gender} type="text" />
              <InputField label="Ngày sinh" value={userInfo.birthday} type="date" />
              <InputField label="Quốc tịch" value={userInfo.nationality} type="text" />
            </div>
          </div>
          {/* Address Info */}
          <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
            <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
              <h3>Địa chỉ thường trú</h3>
              <FiEdit className='text-[1.5rem]'/>
            </div>
            {/* Input Field */}
            <div className='mt-2 grid grid-cols-2 gap-4'>
              <InputField label="Tỉnh/Thành phố" value={userAddress.city} type="text" />
              <InputField label="Quận/Huyện" value={userAddress.district} type="text" />
              <InputField label="Phường/Xã" value={userAddress.ward} type="text" />
              <InputField label="Tên đường, Tòa nhà, Số nhà" value={userAddress.streetName}  type="text" />
            </div>
          </div>
        </div>
      </div>
      <QRCode showQRCode={showQRCode} setShowQRCode={setShowQRCode}/>
    </div>
  )
}

export default AccountDetail
