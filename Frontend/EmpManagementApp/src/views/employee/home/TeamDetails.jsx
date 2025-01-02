import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthProvider';
import { countEmpByManager } from '../../../api/employee';
import { countTeamAbsent, countTeamPresent } from '../../../api/attendance';

const TeamDetails = () => {

  const [empNum, setEmpNum] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  const { user, getToken } = useAuthContext();

  useEffect(() => {
    const token = getToken();
    if (!token || !user) return;

    const fetchData = async () => {
      try {
        const emp = await countEmpByManager(user.empid, token);
        if (emp.data) {
          setEmpNum(emp.data);
        }
        const presentNum = await countTeamPresent(user.empid, token);
        if (presentNum.data) {
          setPresent(presentNum.data);
        }
        const absentNum = await countTeamAbsent(user.empid, token);
        if (absentNum.data) {
          setAbsent(absentNum.data);
        }
      }
      catch (e) {
        console.log(e);
      }
    }

    fetchData();

  }, [getToken, user]);

  return (
    <div className="flex flex-row justify-evenly w-full items-center">
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Tổng nhân viên</div>
        <div className='font-bold text-gray-700 text-[2rem]'>{empNum}</div>
      </div>
      <div className="border-r-[1.5px] border-gray-light h-12"></div>
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Có mặt</div>
        <div className='font-bold text-gray-700 text-[2rem]'>{present}</div>
      </div>
      <div className="border-r-[1.5px] border-gray-light h-12"></div>
      <div className="flex flex-col items-center gap-2">
        <div className='font-medium text-gray-400 text-[1.1rem]'>Xin nghỉ</div>
        <div className='font-bold text-gray-700 text-[2rem]'>{absent}</div>
      </div>
    </div>
  )
}

export default TeamDetails