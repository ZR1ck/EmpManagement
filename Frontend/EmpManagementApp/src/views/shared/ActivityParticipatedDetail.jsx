import React, { useState, useEffect } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
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
import { useAuthContext } from '../../contexts/AuthProvider';
import { getLeaderboard, getParticipationScore } from '../../api/activity';
import { fetchImage } from '../../utils/imageUtils';

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

const ActivityParticipatedDetail = ({ role }) => {

  // const [role] = useState('manager');
  // const [activityDetail, setActivityDetail] = useState({
  //   lastUpdate: '12/10/2024',
  //   title: 'Giải đấu bóng đá Mini Nội Bộ Công Ty - Mùa Thu 2024',
  //   startDate: '2024-08-12',
  //   endDate: '2024-08-30',
  //   participants: 147,
  //   rank: 12,
  //   points: 32,
  // });
  const location = useLocation();
  const [activityDetail] = useState(location.state.activity);
  const [userScore, setUserScore] = useState({ score: '_', rank: '_' })
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, empName: 'Loading...', deptName: 'Loading...', score: 0, avatarUrl: '' },
    { rank: 2, empName: 'Loading...', department: 'Loading...', score: 0, avatarUrl: '' },
    { rank: 3, empName: 'Loading...', department: 'Loading...', score: 0, avatarUrll: '' },
  ]);

  const { user, getToken } = useAuthContext();
  const [images, setImages] = useState([]);

  const fetchImages = async (urls) => {
    const host = process.env.REACT_APP_API_URL;
    try {
      const imagePromises = urls.map(async (url) => {
        try {
          return await fetchImage(host + url);
        } catch (error) {
          console.error(`Error fetching image from ${url}:`, error);
          return null;
        }
      });

      const fetchedImages = await Promise.all(imagePromises);
      setImages(fetchedImages.filter(image => image !== null));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  useEffect(() => {
    const token = getToken();

    if (!token || !activityDetail || !user) return;

    const fetchUserScore = async () => {
      try {
        const response = await getParticipationScore(token, user.empid, activityDetail.activityId);
        if (response.data) {
          setUserScore(response.data);
          setLoading(false);
          setError(null);
        }
      }
      catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    }

    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard(token, activityDetail.activityId);
        if (response.data) {
          // console.log(response.data);
          setLeaderboard(response.data);
          if (response.data.length >= 3) {
            fetchImages([response.data[0].avatarUrl, response.data[1].avatarUrl, response.data[2].avatarUrl]);
          }
          else if (response.data.length === 2) {
            fetchImages([response.data[0].avatarUrl, response.data[1].avatarUrl]);
          }
          else if (response.data.length === 1) {
            fetchImages([response.data[0].avatarUrl]);
          }
          setLeaderboardError(false);
          setLeaderboardError(null);
        }
      }
      catch (e) {
        console.log(e);
        setLeaderboardLoading(false);
        setLeaderboardError(e);
      }
    }

    fetchUserScore();
    fetchLeaderboard();


  }, [getToken, user, activityDetail])

  return (
    <div className='bg-white overflow-y-auto rounded-lg w-full h-full py-4 px-6 font-inter flex flex-col gap-4'>
      {/* Header */}
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl'>
            Quản lý hoạt động <span><BsLightningChargeFill className='text-yellow-500 inline' /></span>
          </h1>
          <span className='text-sm text-gray-medium'>
            Cập nhật lần cuối: {formatDate(activityDetail.updatedate)}
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
          {formatDate(activityDetail.startdate)}
        </div>
        <span><AiOutlineMinus /></span>
        <div className='flex flex-row gap-2 border-2 border-gray-medium items-center px-2 py-2 rounded-lg'>
          <span className='text-xl'>
            <FaCalendarAlt />
          </span>
          {formatDate(activityDetail.enddate)}
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
          value={userScore.rank}
          icon={<FaRankingStar />}
          bgColor='#D4E8FF'
          txtColor='#007AFF' />
        <SummaryCard
          title='Thành tích'
          value={userScore.score}
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
          {leaderboard && leaderboard[2] && (
            <div className='flex flex-col items-center'>
              <div className='w-24 h-24 bg-gray-400 rounded-full'>
                <img src={images[2] || avatar} className='w-full h-full rounded-full' alt='img-top3' onError={(e) => e.target.src = avatar} />
              </div>
              <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm flex justify-center items-center'>
                {leaderboard[2].empName ? leaderboard[2].empName : 'Loading...'}
              </span>
              <div className='bg-blue-medium w-full h-[250px] mt-4 rounded-xl flex flex-col 
            justify-center items-center gap-1'>
                <img
                  src={medal3}
                  alt='img-top3'
                  className='w-16' />
                <span className='text-white font-bold text-[2.5rem] leading-none'>
                  {leaderboard[2].score ? leaderboard[2].score : 'Loading...'}
                </span>
                <span className='text-white font-bold text-lg'>
                  Điểm
                </span>
              </div>
            </div>
          )}
          {/* Top 1 */}
          {leaderboard && leaderboard[0] && (
            <div className='flex flex-col items-center'>
              <div className='w-24 h-24 bg-gray-400 rounded-full'>
                <img src={images[0] || avatar} className='w-full h-full rounded-full' alt='img-top3' onError={(e) => e.target.src = avatar} />
              </div>
              <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm min-w-[130px] flex justify-center items-center'>
                {leaderboard[0].empName ? leaderboard[0].empName : 'Loading...'}
              </span>
              <div className='bg-blue-medium w-full h-[400px] mt-4 rounded-xl flex flex-col 
            items-center'>
                <img
                  src={medal1}
                  alt='img-top3'
                  className='w-16 mt-16' />
                <span className='text-white font-bold text-[2.5rem] leading-none mt-8'>
                  {leaderboard[0].score ? leaderboard[0].score : 'Loading...'}
                </span>
                <span className='text-white font-bold text-lg'>
                  Điểm
                </span>
              </div>
            </div>
          )}
          {/* Top 2 */}
          {leaderboard && leaderboard[1] && (
            <div className='flex flex-col items-center'>
              <div className='w-24 h-24 bg-gray-400 rounded-full'>
                <img src={images[1] || avatar} className='w-full h-full rounded-full' alt='img-top3' onError={(e) => e.target.src = avatar} />
              </div>
              <span className='font-inter font-semibold bg-[#203C84] px-4 text-white 
            rounded-full py-1 mt-[-25px] text-sm min-w-[120px] flex justify-center items-center'>
                {leaderboard[1].empName ? leaderboard[1].empName : 'Loading...'}
              </span>
              <div className='bg-blue-medium w-full h-[300px] mt-4 rounded-xl flex flex-col 
            justify-center items-center gap-1'>
                <img
                  src={medal2}
                  alt='img-top3'
                  className='w-16' />
                <span className='text-white font-bold text-[2.5rem] leading-none'>
                  {leaderboard[1].score ? leaderboard[1].score : 'Loading...'}
                </span>
                <span className='text-white font-bold text-lg'>
                  Điểm
                </span>
              </div>
            </div>
          )}
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
                  <td className='text-center align-middle py-3'>{entry.rank ? entry.rank : 'Loading...'}</td>
                  <td className='text-center align-middle py-3'>{entry.empName ? entry.empName : 'Loading...'}</td>
                  <td className='text-center align-middle py-3'>{entry.deptName ? entry.deptName : 'Loading...'}</td>
                  <td className='text-center align-middle py-3'>{entry.score ? entry.score : 'Loading...'}</td>
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
