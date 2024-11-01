import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { FaRegIdCard } from "react-icons/fa";
import { MdOutlineCreditScore } from "react-icons/md";

export const allNav = [
  //Employee Navigation
  {
    id: 1,
    title: "Trang chủ",
    icon: <IoHomeOutline/>,
    role: 'employee',
    path: '/home',
  },
  {
    id: 2,
    title: "Tài khoản",
    icon: <FaRegUser/>,
    role: 'employee',
    path: '/employee/account/detail',
  },
  {
    id: 3,
    title: "Đơn yêu cầu",
    icon: <FaWpforms/>,
    role: 'employee',
    path: '/employee/form',
  },
  {
    id: 4,
    title: "Thông tin hoạt động",
    icon: <FaPlaneArrival/>,
    role: 'employee',
    path: '/employee/activity-info',
  },
  {
    id: 5,
    title: "Khen thưởng",
    icon: <FiGift/>,
    role: 'employee',
    path: '/employee/reward',
  },
  {
    id: 6,
    title: "Thông tin tài chính",
    icon: <FaRegIdCard/>,
    role: 'employee',
    path: '/employee/financial-info',
  },
  {
    id: 7,
    title: "Điểm thưởng",
    icon: <MdOutlineCreditScore/>,
    role: 'employee',
    path: '/employee/reward-point',
  },
]