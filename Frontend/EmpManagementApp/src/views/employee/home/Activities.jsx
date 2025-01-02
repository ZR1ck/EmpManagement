import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthProvider';
import { getTempActivities } from '../../../api/activity';
import { fetchImage } from '../../../utils/imageUtils';
import swimming from './../../../assets/swimming.jpg';

const ActivityCard = ({ title, image }) => {
    const host = process.env.REACT_APP_API_URL;
    const [img, setImg] = useState(null)
    useEffect(() => {
        if (image) {
            fetchImage(host + image).then(setImg);
        }
    }, [host, image])
    return (
        <div className='border-2 gap-2 flex flex-col justify-center cursor-pointer px-4 py-4 rounded-lg 
      hover:-translate-y-2 transition-transform'>
            <h3 className='font-bold font-inter text-gray-dark '>
                {title}
            </h3>
            <img src={img || swimming} alt='img-activity' className='w-52 rounded-md object-cover h-24' onError={(e) => e.target.src = swimming} />
        </div>
    );
};

const Activities = ({ role }) => {

    const [activities, setActivities] = useState([]);

    const { getToken } = useAuthContext();

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await getTempActivities(token);
                if (response.data) {
                    setActivities(response.data);
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, [getToken])

    return (
        <>
            <div className='flex flex-col w-full justify-around gap-2 py-2'>
                <div className='flex flex-row justify-between'>
                    <div className='font-bold text-gray-medium text-[1.3rem]'>Hoạt đông</div>
                    <Link to={`/${role}/activity`} className='flex flex-row items-center gap-2 text-gray-medium font-semibold hover:underline text-sm'>
                        <p>Đến</p>
                        <FaArrowRight />
                    </Link>
                </div>

                {role === 'manager' && (<>
                    {activities.map((activity, index) => (
                        <div className='grid grid-cols-1 ml-5 justify-between text-[1.1rem] pr-5 gap-2' key={index}>
                            <Link to={`/${role}/activity/${activity.activityId}`} state={{ role: role, id: activity.activityId }} className='text-gray-medium font-semibold hover:underline' >
                                {activity.activityName}
                            </Link>
                        </div>
                    ))}
                </>)}

                {role === 'employee' && (<>
                    <div className='flex flex-row justify-around items-center'>
                        {activities.map((activity, index) => (
                            <Link to={`/${role}/activity/${activity.activityId}`} state={{ role: role, id: activity.activityId }} key={index} className='text-gray-medium font-semibold hover:underline' >
                                <ActivityCard title={activity.activityName} image={activity.imageUrl} />
                            </Link>
                        ))}
                    </div>
                </>)}

            </div>
        </>
    )
}

export default Activities