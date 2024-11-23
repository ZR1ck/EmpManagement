import React, { useState } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import axios from 'axios';

const AddActivity = () => {
    const [formData, setFormData] = useState({
        activityName: '',
        startDate: '',
        endDate: '',
        description: '',
        rules: '',
        criteria: '',
        targetParticipants: '',
        reward: '',
        images: [],
    });
    const [previewURLs, setPreviewURLs] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notification, setNotification] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [...formData.images, ...files];
        const newPreviewURLs = [...previewURLs, ...files.map(file => URL.createObjectURL(file))];

        setFormData(prevState => ({
            ...prevState,
            images: newImages,
        }));

        setPreviewURLs(newPreviewURLs);
        setCurrentImageIndex(0);
    };

    const handleRemoveImage = (index) => {
        setFormData(prevState => {
            const newImages = [...prevState.images];
            newImages.splice(index, 1);
            return { ...prevState, images: newImages };
        });

        setPreviewURLs(prevURLs => {
            const newURLs = [...prevURLs];
            newURLs.splice(index, 1);
            return newURLs;
        });

        setCurrentImageIndex(prevIndex => (prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex));
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
            images: [],
        });
        setPreviewURLs([]);
        setCurrentImageIndex(0);
    };

    const handleConfirm = async () => {
        // console.log(formData);
        setIsDialogOpen(false);

        // Thay dấu xuống dòng bằng '/' của `criteria`, `reward`, và `rules` để hiển thị bên chi tiết
        const formattedCriteria = formData.criteria.replace(/\n/g, '/');
        const formattedReward = formData.reward.replace(/\n/g, '/');
        const formattedRules = formData.rules.replace(/\n/g, '/');

        const data = new FormData();
        for (let i = 0; i < formData.images.length; i++) {
            data.append('images', formData.images[i]);
        }
        const activity = {
            name: formData.activityName,
            startdate: formData.startDate,
            enddate: formData.endDate,
            description: formData.description,
            rules: formattedRules,
            criteria: formattedCriteria,
            targetParticipants: formData.targetParticipants,
            reward: formattedReward,
            createdate: new Date(),
            lastupdate: new Date()
        }
        data.append('activity', new Blob([JSON.stringify(activity)], { type: "application/json" }));
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/activity/add', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            if (response.data) {
                console.log('Activity added successfully:', response.data);
                setSuccess(true);
            } else {
                console.error('Error adding activity:', response);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setSuccess(false);
        }


        setNotification(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex < previewURLs.length - 1 ? prevIndex + 1 : prevIndex));
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
                                required
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
                                    required
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
                                    required
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
                    <div className="w-2/5 relative flex justify-center items-center">
                        {previewURLs.length > 0 ? (
                            <div className="relative flex justify-center items-center w-full h-[350px] bg-gray-100 rounded-md overflow-hidden">
                                <img
                                    src={previewURLs[currentImageIndex]}
                                    alt={`Preview ${currentImageIndex}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                                <IoMdCloseCircle
                                    className="absolute top-2 right-2 text-black cursor-pointer text-2xl"
                                    onClick={() => handleRemoveImage(currentImageIndex)}
                                />
                                {currentImageIndex > 0 && (
                                    <FaArrowLeft
                                        className="absolute left-2 top-1/2 text-2xl cursor-pointer"
                                        onClick={handlePreviousImage}
                                    />
                                )}
                                {currentImageIndex < previewURLs.length - 1 && (
                                    <FaArrowRight
                                        className="absolute right-2 top-1/2 text-2xl cursor-pointer"
                                        onClick={handleNextImage}
                                    />
                                )}
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
                                    multiple
                                    required
                                />
                            </label>
                        )}
                    </div>
                </div>
                {/* Rule */}
                <div className='flex flex-row justify-between w-full gap-8'>
                    <label className='flex flex-col items-start font-semibold gap-2 w-3/5'>
                        Luật lệ
                        <textarea
                            name='rules'
                            className='border-gray-medium border-2 rounded-md 
                        w-full py-2 px-2 outline-none font-normal h-32 text-justify'
                            value={formData.rules}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='flex flex-col items-start font-semibold gap-2 w-2/5'>
                        Đối tượng tham gia
                        <textarea
                            name='targetParticipants'
                            className='border-gray-medium border-2 rounded-md 
                        w-full py-2 px-2 outline-none font-normal h-32 text-justify'
                            value={formData.targetParticipants}
                            onChange={handleChange}
                        />
                    </label>
                </div>
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

            {notification && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <Notification
                        type={success ? "success" : "error"}
                        message={success ? "Thêm thành công" : "Thêm thất bại"}
                        onClose={() => {
                            setNotification(false)
                            if (success) navigate('/manager/activity')
                        }} />
                </div>
            )}
            {/* Confirmation Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận thêm hoạt động?</h3>
                        <div className="flex gap-4 justify-center">
                            <button
                                className="px-4 py-1 rounded-md bg-gray-medium text-white hover:bg-gray-700"
                                onClick={() => setIsDialogOpen(false)}>
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
    );
};

export default AddActivity;
