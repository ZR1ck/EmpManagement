import React, { useState } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AddActivity = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    startDate: '',
    endDate: '',
    description: '',
    rules: '',
    criteria: '',
    reward: '',
  });
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewURL(URL.createObjectURL(file));

    setFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
  };

  const handleCancel = () => {
    setFormData({
      activityName: '',
      startDate: '',
      endDate: '',
      description: '',
      rules: '',
      criteria: '',
      reward: '',
    });
    setImage(null);
    setPreviewURL(null);
  };

  const handleConfirm = async () => {
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter 
    flex flex-col gap-4 overflow-y-auto'>
      {/* Header */}
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
      <span className='w-full h-[1.5px] bg-gray-light'></span>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-row gap-8'>
          {/* Left side */}
          <div className='flex gap-4 flex-col w-3/5'>
            <label className='flex flex-col items-start font-semibold gap-2'>
              Tên hoạt động
              <input
                type='text'
                name='activityName'
                className='border-gray-medium border-2 rounded-md 
                w-full py-2 px-2 outline-none font-normal'
                value={formData.activityName}
                onChange={handleChange}
              />
            </label>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold gap-2'>
                  Từ ngày
                </label>
                <input
                  type='date'
                  name='startDate'
                  className='border-gray-medium border-2 rounded-md 
                  w-[300px] py-2 px-2 outline-none font-normal'
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold gap-2'>
                  Đến ngày
                </label>
                <input
                  type='date'
                  name='endDate'
                  className='border-gray-medium border-2 rounded-md 
                  w-[300px] py-2 px-2 outline-none font-normal'
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label className='flex flex-col items-start font-semibold gap-2'>
              Mô tả
              <textarea
                name='description'
                className='border-gray-medium border-2 rounded-md 
                w-full py-2 px-2 outline-none font-normal h-32 text-justify'
                value={formData.description}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* Image Input */}
          <div className='w-2/5 relative'>
            {previewURL ? (
              <div className="relative">
                <img src={previewURL} alt="Preview" className="w-full h-[350px] object-cover rounded-md" />
                <IoMdCloseCircle
                  className="absolute top-2 right-2 text-black cursor-pointer text-2xl"
                  onClick={handleRemoveImage}
                />
              </div>
            ) : (
              <label htmlFor='img-input' className='cursor-pointer h-full border-2 border-dashed 
              border-gray-medium w-full flex justify-center items-center flex-col'>
                <FaRegImage className='text-[2rem]' />
                <input
                  type='file'
                  className='hidden'
                  id='img-input'
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
        {/* Rule */}
        <label className='flex flex-col items-start font-semibold gap-2'>
          Luật lệ
          <textarea
            name='rules'
            className='border-gray-medium border-2 rounded-md 
            w-full py-2 px-2 outline-none font-normal h-32 text-justify'
            value={formData.rules}
            onChange={handleChange}
          />
        </label>
        {/* Reward and criteria */}
        <div className='flex flex-row justify-between w-full gap-8'>
          <label className='flex flex-col items-start font-semibold gap-2 w-3/5'>
            Tiêu chí đánh giá
            <textarea
              className='border-gray-medium border-2 rounded-md 
             py-2 px-2 outline-none font-normal h-32 text-justify w-full'
              name='criteria'
              value={formData.criteria}
              onChange={handleChange}>
            </textarea>
          </label>
          <label className='flex flex-col items-start font-semibold gap-2 w-2/5'>
            Phần thưởng
            <textarea
              className='border-gray-medium border-2 rounded-md 
            py-2 px-2 outline-none font-normal h-32 text-justify w-full'
              name='reward'
              value={formData.reward}
              onChange={handleChange}>
            </textarea>
          </label>
        </div>
        <div className='justify-end text-white flex flex-row gap-2 transition-colors'>
          <button type='button' onClick={handleCancel} className='px-8 rounded-md py-1 bg-gray-medium hover:bg-gray-700'>
            Hủy
          </button>
          <button type='submit' className='px-4 rounded-md py-1 bg-blue-medium hover:bg-blue-700'>
            Xác nhận
          </button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
            <p>Xác nhận thêm hoạt động ?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-700"
                onClick={() => setIsDialogOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-700"
                onClick={handleConfirm}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddActivity;
