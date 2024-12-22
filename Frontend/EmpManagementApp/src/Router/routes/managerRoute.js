import Home from "../../views/employee/Home"
import AccountDetail from "../../views/employee/account-info/AccountDetail"
import Work from "../../views/employee/account-info/Work";
import AddActivity from "../../views/manager/AddActivity";
import ApproveActivity from "../../views/manager/ApproveActivity";
import Request from "../../views/manager/Request";
import EmpInfo from "../../views/manager/EmpInfo";
import Info from "../../views/manager/emp-info/Info";
import ActivityInfo from "../../views/shared/ActivityInfo";
import AccountContact from './../../views/employee/account-info/AccountContact';
import ActivityDetail from "../../views/shared/ActivityDetail";
import ActivityParticipated from "../../views/shared/ActivityParticipated";
import ActivityParticipatedDetail from "../../views/shared/ActivityParticipatedDetail";
import RewardPage from "../../views/manager/RewardPage";


const managerRoutes = [
  {
    path: '/manager/home',
    element: <Home />,
    role: 'manager',
  },
  {
    path: '/manager/account/detail',
    element: <AccountDetail role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/account/contact',
    element: <AccountContact role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/account/work',
    element: <Work role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/activity',
    element: <ActivityInfo role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/activity/participated',
    element: <ActivityParticipated role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/activity/participated/:id',
    element: <ActivityParticipatedDetail role="manager" />,
    role: 'manager',
  },
  {
    path: '/manager/activity/add',
    element: <AddActivity />,
    role: 'manager',
  },
  {
    path: '/manager/request',
    element: <Request />,
    role: 'manager'
  },
  {
    path: '/manager/employees',
    element: <EmpInfo />,
    role: 'manager',
  },
  {
    path: '/manager/employees/detail',
    element: <Info />,
    role: 'manager',
  },
  {
    path: '/manager/activity/:id',
    element: <ActivityDetail />,
    role: 'manager',
  },
  {
    path: '/manager/activity/approval',
    element: <ApproveActivity />,
    role: 'manager',
  },
  {
    path: '/manager/reward',
    element: <RewardPage />,
    role: 'manager',
  }
]

export default managerRoutes