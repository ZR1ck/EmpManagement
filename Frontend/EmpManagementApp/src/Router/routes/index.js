import MainLayout from "../../layout/MainLayout"
import employeeRoutes from "./employeeRoutes"
import managerRoutes from './managerRoute';
import Login from '../../layout/Login';
import Register from '../../layout/Register';



const getRoutes = () => {
  const allRoutes = [
    ...employeeRoutes,
    ...managerRoutes
  ]

  return [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: allRoutes,
      protected: true
    }
  ]
}

export default getRoutes