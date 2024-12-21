import React, { useState, useEffect } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { formatDate } from '../../utils/formatDate';
import { AiOutlineMinus } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { GrScorecard } from "react-icons/gr";
import { FaRankingStar } from "react-icons/fa6";
import medal1 from './../../assets/top1.png'
import medal2 from './../../assets/top2.png'
import medal3 from './../../assets/top3.png'
import avatar from './../../assets/avatar.jpg'

const SummaryCard = ({ title, value, unit, icon, bgColor, txtColor }) => {
  return (
    <div className='flex flex-row justify-between w-56 items-center 
    px-4 py-3 rounded-lg border-gray-300 shadow-around'>
      <div>
        <p className='font-medium text-sm'>{title}</p>
        <p className='mt-2 font-semibold text-2xl'>{value} {unit}</p>
      </div>
      <div className='px-2 py-2 rounded-lg' style={{ color: txtColor, backgroundColor: bgColor }}>
        <span className='text-2xl'>
          {icon}
        </span>
      </div>
    </div>
  )
}

const ActivityParticipatedDetail = () => {

  const [role] = useState('manager');
  const [activityDetail, setActivityDetail] = useState({
    lastUpdate: '12/10/2024',
    title: 'Giải đấu bóng đá Mini Nội Bộ Công Ty - Mùa Thu 2024',
    startDate: '2024-08-12',
    endDate: '2024-08-30',
    participants: 147,
    rank: 12,
    points: 32,
  });

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Nguyễn Văn D', department: 'Phòng nhân sự', points: 40 },
    { rank: 2, name: 'Trần Văn E', department: 'Phòng kỹ thuật', points: 35 },
    { rank: 3, name: 'Lê Thị F', department: 'Phòng kế toán', points: 30 },
    { rank: 4, name: 'Nguyễn Văn G', department: 'Phòng marketing', points: 24 },
    { rank: 4, name: 'Nguyễn Văn G', department: 'Phòng marketing', points: 24 },
    { rank: 4, name: 'Nguyễn Văn G', department: 'Phòng marketing', points: 24 },
  ]);

  return (
    <div className='bg-white overflow-y-auto rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
      {/* Header */}
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl'>
            Quản lý hoạt động <span><BsLightningChargeFill className='text-yellow-500 inline' /></span>
          </h1>
          <span className='text-sm text-gray-medium'>
            Cập nhật lần cuối: {formatDate(activityDetail.lastUpdate)}
          </span>
        </div>
        {/* Activity List */}
        <Link to={`/${role}/activity`} className='flex flex-row items-center gap-2 text-gray-medium 
        font-semibold hover:underline text-sm'>
          <p>Danh sách hoạt động</p>
          <FaArrowRight />
        </Link>
      </div>
      {/* Divider */}
      <div className='flex'>
        <span className='w-full h-[1.2px] bg-gray-300'></span>
      </div>
      {/* Activity Detail */}
      {/* Title */}
      <h1 className='font-inter text-[1.75rem] font-semibold'>
        {activityDetail.title}
      </h1>
      {/* Time */}
      <div className='flex flex-row gap-2 items-center text-gray-600'>
        <div className='flex flex-row gap-2 border-2 border-gray-medium items-center px-2 py-2 rounded-lg'>
          <span className='text-xl '>
            <FaCalendarAlt />
          </span>
          {activityDetail.startDate}
        </div>
        <span><AiOutlineMinus /></span>
        <div className='flex flex-row gap-2 border-2 border-gray-medium items-center px-2 py-2 rounded-lg'>
          <span className='text-xl'>
            <FaCalendarAlt />
          </span>
          {activityDetail.endDate}
        </div>
      </div>
      {/* Summary */}
      <div className='flex flex-row gap-6'>
        <SummaryCard
          title='Số người tham gia'
          value={activityDetail.participants}
          icon={<FaUserGroup />}
          bgColor='#FFF2C2'
          txtColor='#FFC700' />
        <SummaryCard
          title='Hạng'
          value={activityDetail.rank}
          icon={<FaRankingStar />}
          bgColor='#D4E8FF'
          txtColor='#007AFF' />
        <SummaryCard
          title='Thành tích'
          value={activityDetail.points}
          unit='điểm'
          icon={<GrScorecard />}
          bgColor='#FFD4D4'
          txtColor='#E51B1B' />
      </div>
      {/* Leaderboard */}
      <div className='flex flex-row mt-12 justify-between'>
        {/* Top 3 chart */}
        <div className='flex flex-row gap-8 items-end'>
          {/* Top 3 */}
          <div className='flex flex-col items-center'>
            <div className='w-24 h-24 bg-gray-400 rounded-full'>
              <img src={avatar} className='w-full h-full rounded-full' alt='img-top3' />
            </div>
            <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm'>
              {leaderboard[2].name}
            </span>
            <div className='bg-blue-medium w-full h-[250px] mt-4 rounded-xl flex flex-col 
            justify-center items-center gap-1'>
              <img
                src={medal3}
                alt='img-top3'
                className='w-16' />
              <span className='text-white font-bold text-[2.5rem] leading-none'>
                {leaderboard[2].points}
              </span>
              <span className='text-white font-bold text-lg'>
                Điểm
              </span>
            </div>
          </div>
          {/* Top 1 */}
          <div className='flex flex-col items-center'>
            <div className='w-24 h-24 bg-gray-400 rounded-full'>
              <img src={avatar} className='w-full h-full rounded-full' alt='img-top3' />
            </div>
            <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm min-w-[130px]'>
              {leaderboard[0].name}
            </span>
            <div className='bg-blue-medium w-full h-[400px] mt-4 rounded-xl flex flex-col 
            items-center'>
              <img
                src={medal1}
                alt='img-top3'
                className='w-16 mt-16' />
              <span className='text-white font-bold text-[2.5rem] leading-none mt-8'>
                {leaderboard[0].points}
              </span>
              <span className='text-white font-bold text-lg'>
                Điểm
              </span>
            </div>
          </div>
          {/* Top 2 */}
          <div className='flex flex-col items-center'>
            <div className='w-24 h-24 bg-gray-400 rounded-full'>
              <img src={avatar} className='w-full h-full rounded-full' alt='img-top3' />
            </div>
            <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm min-w-[120px]'>
              {leaderboard[1].name}
            </span>
            <div className='bg-blue-medium w-full h-[300px] mt-4 rounded-xl flex flex-col 
            justify-center items-center gap-1'>
              <img
                src={medal2}
                alt='img-top3'
                className='w-16' />
              <span className='text-white font-bold text-[2.5rem] leading-none'>
                {leaderboard[1].points}
              </span>
              <span className='text-white font-bold text-lg'>
                Điểm
              </span>
            </div>
          </div>
        </div>
        {/* Ranking */}
        <div className='border-2 w-[600px] h-[500px] border-gray-medium rounded-lg px-4 overflow-y-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b-2 border-gray-400'>
                <th className='text-center py-2'>Hạng</th>
                <th className='text-center py-2'>Tên</th>
                <th className='text-center py-2'>Phòng ban</th>
                <th className='text-center py-2'>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index} className='hover:bg-gray-100 border-b-2 border-gray-400'>
                  <td className='text-center align-middle py-3'>{entry.rank}</td>
                  <td className='text-center align-middle py-3'>{entry.name}</td>
                  <td className='text-center align-middle py-3'>{entry.department}</td>
                  <td className='text-center align-middle py-3'>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityParticipatedDetail;
