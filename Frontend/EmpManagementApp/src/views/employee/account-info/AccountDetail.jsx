import React, { useState, useEffect } from 'react'
import avatar from './../../../assets/avatar.jpg'
import { BiQrScan } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Sidebar from './Sidebar';
import qr_code from './../../../assets/qrcode.jpg'
import { useAuthContext } from '../../../contexts/AuthProvider';
import { formatDate } from '../../../utils/formatDate';
import { parseAddress } from '../../../utils/parseAddress';
import LoadingScreen from '../../../components/Loading';
import ErrorPage from '../../../components/Error';

const InputField = ({ label, value = '', type, readOnly, onChange }) => {
  return (
    <div className='flex flex-col w-fit'>
      <label className='font-medium text-gray-400'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className='w-fit py-[4px] text-gray-medium focus:outline-none focus:border-none'
      />
    </div>
  );
};


const QRCode = ({ showQRCode, setShowQRCode }) => {
  const handleShowQRCode = () => {
    setShowQRCode(!showQRCode);
  }

  return (
    <div className={`${showQRCode ? '' : 'hidden'} fixed font-inter top-0 left-0 
    w-screen h-screen flex justify-center items-center`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={handleShowQRCode}>
      <div className='bg-white  absolute flex justify-center items-center flex-col px-4 py-8 rounded-lg'>
        <img src={qr_code} alt='img-qr-code' className='w-56' />
        <span className='font-bold text-gray-medium'>Quét mã để xem chi tiết</span>
      </div>
    </div>
  )
}

const AccountDetail = (userRole) => {

  const host = process.env.REACT_APP_API_URL;

  const { user, loading, error } = useAuthContext();

  const [isReadOnly, setIsReadOnly] = useState(true);

  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    gender: '',
    birthday: '',
    nationality: '',
    position: '',
    role: userRole,
  });

  const [userAddress, setUserAddress] = useState('');
  const [userTempAddress, setUserTempAddress] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  const fetchImage = async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch((e) => {
      console.log("Image fetching error: ", e);
    });
    if (response) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return null;
  };

  useEffect(() => {
    if (!loading && user) {
      setUserInfo({
        id: user.empid || '',
        name: user.name || '',
        gender: user.gender || '',
        birthday: user.birth ? formatDate(user.birth) : '',
        nationality: user.nationality || '',
        position: user.position || '',
        role: userRole,
      });
      setUserAddress(parseAddress(user.permanentaddress || ''));
      setUserTempAddress(parseAddress(user.tempaddress || ''));
      fetchImage(host + user.avatarurl)
        .then(setImageSrc)
    }
  }, [loading, user, userRole]);

  // Hàm thay đổi readOnly khi nhấn nút
  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

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
        <Sidebar pathname='account-detail' role={userRole.role} />
        {/* Content */}
        {loading ? (
          <LoadingScreen />
        ) : error ? (<ErrorPage />) : (
          <>
            <div className='flex flex-col overflow-y-auto max-h-[550px] w-full gap-4 '>
              {/* Intro */}
              <div className='flex flex-row border-[2px] border-gray-light w-full pl-10 pr-4 py-4 
          rounded-lg justify-between'>
                <div className='flex flex-row gap-6 items-center'>
                  <img src={imageSrc || avatar} alt='img-avatar' className='w-20 h-20 rounded-full' onError={(e) => e.target.src = avatar} />
                  <div className='flex flex-col gap-2'>
                    <span className='font-semibold text-[1.5rem] text-gray-medium'>
                      {userInfo.name}
                    </span>
                    <span className='text-[1.2rem] text-gray-medium font-light'>
                      {userInfo.position}
                    </span>
                  </div>
                </div>
                <BiQrScan className='text-[2rem] text-gray-dark cursor-pointer' />
              </div>
              {/* Personal Info */}
              <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
                  <h3>Thông tin cá nhân</h3>
                  <FiEdit
                    className='text-[1.5rem] cursor-pointer'
                    onClick={toggleReadOnly}
                  />
                </div>
                {/* Input Field */}
                <div className='mt-2 grid grid-cols-2 gap-4'>
                  <InputField label="Tên" value={userInfo.name} type="text" readOnly={isReadOnly} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                  <InputField label="ID" value={userInfo.id} type="text" readOnly={isReadOnly} onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })} />
                  <InputField label="Giới tính" value={userInfo.gender} type="text" readOnly={isReadOnly} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
                  <InputField label="Ngày sinh" value={userInfo.birthday} type="date" readOnly={isReadOnly} onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })} />
                  <InputField label="Quốc tịch" value={userInfo.nationality} type="text" readOnly={isReadOnly} onChange={(e) => setUserInfo({ ...userInfo, nationality: e.target.value })} />
                </div>
              </div>
              {/* Address Info */}
              <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
                  <h3>Địa chỉ thường trú</h3>
                  <FiEdit className='text-[1.5rem]' />
                </div>
                {/* Input Field */}
                <div className='mt-2 grid grid-cols-2 gap-4'>
                  <InputField label="Tỉnh/Thành phố" value={userAddress.city} type="text" readOnly={isReadOnly} onChange={(e) => setUserAddress({ ...userAddress, city: e.target.value })} />
                  <InputField label="Quận/Huyện" value={userAddress.district} type="text" readOnly={isReadOnly} onChange={(e) => setUserAddress({ ...userAddress, district: e.target.value })} />
                  <InputField label="Phường/Xã" value={userAddress.ward} type="text" readOnly={isReadOnly} onChange={(e) => setUserAddress({ ...userAddress, ward: e.target.value })} />
                  <InputField label="Tên đường, Tòa nhà, Số nhà" value={userAddress.street} type="text" readOnly={isReadOnly} onChange={(e) => setUserAddress({ ...userAddress, street: e.target.value })} />
                </div>
              </div>
              {/* Temporary Address Info */}
              <div className='pl-10 pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-row text-lg items-center justify-between font-bold text-gray-medium'>
                  <h3>Địa chỉ tạm trú</h3>
                  <FiEdit className='text-[1.5rem]' />
                </div>
                {/* Input Field */}
                <div className='mt-2 grid grid-cols-2 gap-4'>
                  <InputField label="Tỉnh/Thành phố" value={userTempAddress.city} type="text" readOnly={isReadOnly} onChange={(e) => setUserTempAddress({ ...userTempAddress, city: e.target.value })} />
                  <InputField label="Quận/Huyện" value={userTempAddress.district} type="text" readOnly={isReadOnly} onChange={(e) => setUserTempAddress({ ...userTempAddress, district: e.target.value })} />
                  <InputField label="Phường/Xã" value={userTempAddress.ward} type="text" readOnly={isReadOnly} onChange={(e) => setUserTempAddress({ ...userTempAddress, ward: e.target.value })} />
                  <InputField label="Tên đường, Tòa nhà, Số nhà" value={userTempAddress.street} type="text" readOnly={isReadOnly} onChange={(e) => setUserTempAddress({ ...userTempAddress, street: e.target.value })} />
                </div>
              </div>
            </div>
          </>)}
      </div>
    </div>
  );
};

export default AccountDetail;
