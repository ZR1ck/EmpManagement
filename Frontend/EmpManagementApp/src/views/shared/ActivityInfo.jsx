import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import { FaCalendarAlt } from "react-icons/fa";
import swimming from './../../assets/swimming.jpg';
import { FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthProvider';
import { getOnGoingActivities } from '../../api/activity';
import { formatDate, getLatestDate } from '../../utils/formatDate';
import { fetchImage } from '../../utils/imageUtils';

const Activity = ({ title, image, description, participants, date }) => {
  const host = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null)
  useEffect(() => {
    if (image.length > 0) {
      fetchImage(host + image[0]).then(setImg);
    }
  }, [host, image])
  return (
    <div className='border-2 gap-2 flex flex-col justify-center cursor-pointer px-4 py-4 rounded-lg 
      hover:-translate-y-2 transition-transform'>
      <h3 className='font-bold font-inter text-gray-dark '>
        {title}
      </h3>
      <img src={img || swimming} alt='img-activity' className='w-52 rounded-md object-cover h-24' onError={(e) => e.target.src = swimming}
      />
      <p className='max-w-52 text-justify text-sm text-gray-medium overflow-hidden max-h-[58px] line-clamp-2'>
        {description}
      </p>

      <div className='flex flex-row justify-between text-sm items-center border-t-2
        border-l-gray-medium pt-2 mt-2 font-semibold text-gray-medium'>
        <span className="flex items-center gap-2">
          <FaUserCheck />
          <span>{participants}</span>
        </span>
        <span className="flex items-center space-x-1 gap-2">
          <FaCalendarAlt />
          <span>{date}</span>
        </span>
      </div>
    </div>
  );
};

const ActivityInfo = ({ role }) => {
  const [sortDropdown, setSortDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortByDate, setSortByDate] = useState(false);

  const [activitiesData, setActivitiesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // {
  //   title: "Thử thách đạp xe 100km",
  //   image: swimming,
  //   description: "Tham gia đạp xe 100km để tăng cường sức bền và sức khỏe.",
  //   participants: 15,
  //   date: "2024-12-15",
  // }
  const { getToken } = useAuthContext();

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await getOnGoingActivities(token);
        if (response.data) {
          console.log(response.data);
          setActivitiesData(response.data);
          setLoading(false);
        }
      }
      catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    }

    fetchData();
  }, [getToken])

  const sortActivities = (activities) => {
    return activities.sort((a, b) => {
      if (sortByDate) {
        return sortOrder === 'asc'
          ? new Date(a.createdate) - new Date(b.createdate)
          : new Date(b.createdate) - new Date(a.createdate);
      } else {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
  };


  const filteredActivities = activitiesData.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sortedActivities = sortActivities(filteredActivities);

  return (
    <div className='bg-white rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-12'>
      {/* Header */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>
            Quản lý hoạt động <span><BsLightningChargeFill className='text-yellow-500 inline' /></span>
          </h1>
          <span className='font- text-sm text-gray-medium'>
            Cập nhật lần cuối: 30/10/2024
          </span>
        </div>
        {/* Search Bar */}
        <div className='flex flex-row items-center gap-2 border-2 border-gray-300 h-10 rounded-lg'>
          <div className='w-10 h-full hover:bg-gray-300 rounded-s-md flex justify-center items-center text-gray-500 text-xl'>
            <IoSearchSharp />
          </div>
          <input
            placeholder='Tìm kiếm'
            className='outline-none placeholder:text-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Add Activity Button */}
      <div className='flex flex-row gap-4'>
        {/* Add Button */}
        <Link to='/manager/activity/add'>
          <button className={`bg-blue-dark h-10  hover:bg-blue-700 transition-colors px-4 rounded-lg 
          text-sm text-white ${role === 'manager' ? '' : 'hidden'}`}>
            Thêm hoạt động
          </button>
        </Link>
        <Link to='/manager/activity/approval'>
          <button className={`bg-blue-dark h-10 hover:bg-blue-700 transition-colors px-4 rounded-lg 
          text-sm text-white ${role === 'manager' ? '' : 'hidden'}`}>
            Yêu cầu tham gia
          </button>
        </Link>
      </div>
      {/* Activity Type */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-12'>
          {/* Ongoing */}
          <Link to={`/${role}/activity`}>
            <div className='flex flex-row w-56 items-center justify-between py-2 border-b-[2.4px] border-blue-500
          cursor-pointer'>
              <p className='font-bold text-sm'>
                ĐANG DIỄN RA
              </p>
              <span className='border-[1.6px] text-gray-medium font-semibold px-3 py-[1px] text-[12px] rounded-full'>
                {activitiesData.length}
              </span>
            </div>
          </Link>
          {/* Finished */}
          <div className={`flex flex-row w-56 items-center justify-between py-2 border-b-[2.4px] border-black
          cursor-pointer hover:border-blue-medium hover:text-blue-600`}>
            <p className='font-bold text-sm'>
              ĐÃ DIỄN RA
            </p>
            <span className='border-[1.6px] text-gray-medium font-semibold px-3 py-[1px] text-[12px] rounded-full'>
              2
            </span>
          </div>
          {/* Participated */}
          <Link to={`/${role}/activity/participated`}>
            <div className={`flex flex-row w-56 items-center justify-between py-2 border-b-[2.4px] border-black
            cursor-pointer hover:border-blue-medium hover:text-blue-600`}>
              <p className='font-bold text-sm'>
                ĐÃ THAM GIA
              </p>
              <span className='border-[1.6px] text-gray-medium font-semibold px-3 py-[1px] text-[12px] rounded-full'>
                2
              </span>
            </div>
          </Link>
        </div>
        {/* Sort */}
        <div className='relative'>
          <p className='text-sm text-gray-medium cursor-pointer' onClick={() => setSortDropdown(!sortDropdown)}>
            Sắp xếp
            <span><FaSortAmountDownAlt className='inline ml-2' /></span>
          </p>
          {/* Dropdown */}
          <div className={`${sortDropdown ? '' : 'hidden'} bg-white border-2 w-32 absolute right-0 top-8 flex flex-col gap-2 rounded-md`}>
            <p className='hover:bg-gray-300 py-2 px-2 text-sm text-gray-medium cursor-pointer' onClick={() => {
              setSortByDate(false);
              setSortOrder('asc');
              setSortDropdown(false);
            }}>
              <span><ImSortAlphaAsc className='inline' /></span> Tăng dần
            </p>
            <p className='hover:bg-gray-300 py-2 px-2 text-sm text-gray-medium cursor-pointer' onClick={() => {
              setSortByDate(false);
              setSortOrder('desc');
              setSortDropdown(false);
            }}>
              <span><ImSortAlphaDesc className='inline' /></span> Giảm dần
            </p>
            <p className='hover:bg-gray-300 py-2 px-2 text-sm text-gray-medium cursor-pointer' onClick={() => {
              setSortByDate(true);
              setSortOrder('asc');
              setSortDropdown(false);
            }}>
              <span><FaCalendarAlt className='inline' /></span> Cũ nhất
            </p>
            <p className='hover:bg-gray-300 py-2 px-2 text-sm text-gray-medium cursor-pointer' onClick={() => {
              setSortByDate(true);
              setSortOrder('desc');
              setSortDropdown(false);
            }}>
              <span><FaCalendarAlt className='inline' /></span> Mới nhất
            </p>
          </div>
        </div>
      </div>
      {/* Activity List */}
      <div className='grid grid-cols-5 gap-4 overflow-y-auto pt-2'>
        {sortedActivities.map((activity, index) => (
          <Link to={`/${role}/activity/${activity.activityId}`} state={{ role: role, id: activity.activityId }} key={index}>
            <Activity
              key={index}
              title={activity.title}
              image={activity.imageUrl}
              description={activity.description}
              participants={activity.participants}
              date={formatDate(activity.createdate)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivityInfo;
