import Home from "../../views/employee/Home"
import AccountDetail from "../../views/employee/account-info/AccountDetail"
import Work from "../../views/employee/account-info/Work";
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
    element: <AccountContact/>,
    role: 'employee',
  },
  {
    path: '/employee/account/work',
    element: <Work/>,
    role: 'employee',
  },
]

export default employeeRoutes