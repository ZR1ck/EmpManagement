import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'

const EmpContacts = ({ user }) => {

    const [normalPhoneNumber, setNormalPhoneNumber] = useState([])

    const [urgentPhoneNumber, setUrgentPhoneNumber] = useState([])

    const [email, setEmail] = useState([])

    const [socialLink, setSocialLink] = useState([
        {
            name: 'Facebook',
            link: 'facebook.com'
        },
        {
            name: 'Twitter',
            link: 'none'
        },
        {
            name: 'Linkedln',
            link: 'none'
        },

    ])

    useEffect(() => {
        if (user) {
            setNormalPhoneNumber(user.phonenum || []);
            setUrgentPhoneNumber(user.emergencynum || []);
            setEmail(user.personalemail || [])
        }
    }, [user]);

    return (

        <div className='flex flex-col overflow-y-auto max-h-[550px] w-full gap-4 '>
            {/* Phone Number */}
            <div className='pl-10  pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-col text-lg justify-between font-bold gap-3'>
                    <h3 className='text-gray-medium'>Điện thoại</h3>
                    <div className='flex flex-row w-full justify-between gap-5'>
                        {/* Normal Phone Number */}
                        <div className='flex flex-col gap-2 font-normal max-h-[200px] overflow-y-auto
                 w-1/2 border-r-2 pr-12'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-light'>Thông thường</p>
                                <FiEdit className='text-[1.5rem] text-gray-medium cursor-pointer' />
                            </div>
                            {
                                normalPhoneNumber.map((value, i) => (
                                    <p className='text-gray-medium text-[1rem] tracking-wider' key={i}>
                                        {value}
                                    </p>
                                ))
                            }
                        </div>
                        {/* Urgent Phone Number */}
                        <div className='flex flex-col gap-2 font-normal max-h-[200px] overflow-y-auto 
                w-1/2 border-r-2 pr-12'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-light'>Khẩn cấp</p>
                                <FiEdit className='text-[1.5rem] text-gray-medium cursor-pointer' />
                            </div>
                            {
                                urgentPhoneNumber.map((value, i) => (
                                    <p className='text-gray-medium text-[1rem] tracking-wider' key={i}>
                                        {value}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* Input Field */}
                <div className='mt-2 grid grid-cols-2 gap-3'>
                </div>
            </div>
            {/* Email */}
            <div className='pl-10  pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-col gap-2 font-normal max-h-[200px] overflow-y-auto w-full border-r-2 pr-12'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-gray-medium font-bold'>Email</p>
                        <FiEdit className='text-[1.5rem] text-gray-medium cursor-pointer' />
                    </div>
                    {
                        email.map((value, i) => (
                            <p className='text-gray-medium text-[1rem] tracking-wider' key={i}>
                                {value}
                            </p>
                        ))
                    }
                </div>
                {/* Input Field */}
                <div className='mt-2 grid grid-cols-2 gap-3'>
                </div>
            </div>
            {/* Other */}
            <div className='pl-10  pr-4 py-6 border-[2px] border-gray-light rounded-lg'>
                <div className='flex flex-col gap-2 font-normal max-h-[200px] overflow-y-auto w-full border-r-2 pr-12'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-gray-medium font-bold'>Khác</p>
                        <FiEdit className='text-[1.5rem] text-gray-medium cursor-pointer' />
                    </div>
                    {
                        socialLink.map((link, i) => (
                            <div key={i} className="flex flex-row justify-between w-1/2">
                                <p className='text-gray-400 font-bold'>{link.name}</p>
                                <p className='text-gray-medium'>{link.link}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EmpContacts