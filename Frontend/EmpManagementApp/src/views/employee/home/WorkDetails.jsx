import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthProvider';
import { countAbsentRecords, countAttendanceRecords } from '../../../api/attendance';
import { countParticipatedActivities } from '../../../api/activity';

const WorkDetails = () => {

    const [daywork, setDaywork] = useState(0);
    const [dayabsent, setDayabsent] = useState(0);
    const [activities, setActivities] = useState(0);

    const { user, getToken } = useAuthContext();

    useEffect(() => {
        const token = getToken();
        if (!token || !user) return;

        const fetchData = async () => {
            try {
                const work = await countAttendanceRecords(user.empid, token);
                if (work.data) {
                    setDaywork(work.data);
                }
                const absent = await countAbsentRecords(user.empid, token);
                if (absent.data) {
                    setDayabsent(absent.data);
                }
                const activity = await countParticipatedActivities(user.empid, token);
                if (activity.data) {
                    setActivities(activity.data);
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
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số ngày làm việc</div>
                <div className='font-bold text-gray-700 text-[2rem]'>{daywork}</div>
            </div>
            <div className="border-r-[1.5px] border-gray-light h-12"></div>
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số ngày đã nghỉ</div>
                <div className='font-bold text-gray-700 text-[2rem]'>{dayabsent}</div>
            </div>
            <div className="border-r-[1.5px] border-gray-light h-12"></div>
            <div className="flex flex-col items-center">
                <div className='font-medium text-gray-400 text-[1.1rem]'>Số hoạt động đã tham gia</div>
                <div className='font-bold text-gray-700 text-[2rem]'>{activities}</div>
            </div>
        </div>

    )
}

export default WorkDetails