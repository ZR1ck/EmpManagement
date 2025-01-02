import MainLayout from "../../layout/MainLayout"
import employeeRoutes from "./employeeRoutes"
import managerRoutes from './managerRoute';
import Login from '../../layout/Login';
import Register from '../../layout/Register';
import ErrorPage from "../../components/Error";



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
    },
    {
      path: '*',
      element: <ErrorPage code="404" msg1="Page Not Found" msg2="The page you are looking for does not exist." />
    }
  ]
}

export default getRoutes