import React, { useEffect, useState } from 'react'
import { getCurrentAttendanceRecord } from '../../../api/attendance';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { timeToSeconds } from '../../../utils/formatDate';

const AttendanceDetails = () => {

    const [record, setRecord] = useState({
        checkintime: null,
        checkouttime: null
    });
    const { user, getToken } = useAuthContext();
    const [late, setLate] = useState(false);
    const [early, setEarly] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token || !user) return;

        const fetchData = async () => {
            try {
                const response = await getCurrentAttendanceRecord(user.empid, token);
                if (response.data) {
                    setRecord(response.data);
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, [getToken, user]);

    useEffect(() => {
        if (record.checkintime && record.checkouttime) {
            if (timeToSeconds(record.checkintime) > timeToSeconds("09:00:00")) {
                setLate(true);
            }
            else setLate(false);

            if (timeToSeconds(record.checkouttime) < timeToSeconds("17:00:00")) {
                setEarly(true);
            }
            else setEarly(false);
        }
    }, [record, setLate, setEarly]);


    return (
        <div className='flex flex-col justify-around gap-2 py-2'>
            <div className='font-bold text-gray-medium text-[1.3rem]'>Chấm công </div>

            <div className='grid grid-cols-2 ml-5 justify-between text-[1.1rem] pr-5 gap-2'>
                <div>Check In: </div>
                <span className={`font-medium ${record.checkintime && late ? 'text-red-500' : 'text-green-600'}`}>{record.checkintime ? record.checkintime : 'Chưa check in'}</span>
                <div>Check Out: </div>
                <span className={`font-medium ${record.checkouttime ? (early ? 'text-red-500' : 'text-green-600') : 'text-gray-400'}`}>{record.checkouttime ? record.checkouttime : 'Chưa check out'}</span>

            </div>
        </div>
    )
}

export default AttendanceDetails