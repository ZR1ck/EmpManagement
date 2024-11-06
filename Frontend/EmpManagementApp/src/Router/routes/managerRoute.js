import Home from "../../views/employee/Home"
import AccountDetail from "../../views/employee/account-info/AccountDetail"
import Work from "../../views/employee/account-info/Work";
import AddActivity from "../../views/manager/AddActivity";
import ActivityInfo from "../../views/shared/ActivityInfo";
import AccountContact from './../../views/employee/account-info/AccountContact';


const managerRoutes = [
  {
    path: '/manager/home',
    element: <Home/>,
    role: 'manager',
  },
  {
    path: '/manager/account/detail',
    element: <AccountDetail role="manager"/>,
    role: 'manager',
  },
  {
    path: '/manager/account/contact',
    element: <AccountContact role="manager"/>,
    role: 'manager',
  },
  {
    path: '/manager/account/work',
    element: <Work role="manager"/>,
    role: 'manager',
  },
  {
    path: '/manager/activity',
    element: <ActivityInfo role="manager"/>,
    role: 'manager',
  },
  {
    path: '/manager/activity/add',
    element: <AddActivity/>,
    role: 'manager',
  },
]

export default managerRoutes