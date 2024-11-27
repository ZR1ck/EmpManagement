import Home from "../../views/employee/Home"
import AccountDetail from "../../views/employee/account-info/AccountDetail"
import Work from "../../views/employee/account-info/Work";
import { RequestForm } from "../../views/employee/request/RequestForm";
import ActivityDetail from "../../views/shared/ActivityDetail";
import ActivityInfo from "../../views/shared/ActivityInfo";
import AccountContact from './../../views/employee/account-info/AccountContact';


const employeeRoutes = [
  {
    path: '/employee/home',
    element: <Home/>,
    role: 'employee',
  },
  {
    path: '/employee/account/detail',
    element: <AccountDetail role="employee"/>,
    role: 'employee',
  },
  {
    path: '/employee/account/contact',
    element: <AccountContact role="employee"/>,
    role: 'employee',
  },
  {
    path: '/employee/account/work',
    element: <Work role="employee"/>,
    role: 'employee',
  },
  {
    path: '/employee/form',
    element: <RequestForm/>,
    role: 'employee',
  },
  {
    path: '/employee/activity',
    element: <ActivityInfo role="employee"/>,
    role: 'employee',
  },
  {
    path: '/employee/activity/:id',
    element: <ActivityDetail/>,
    role: 'employee',
  }
]

export default employeeRoutes